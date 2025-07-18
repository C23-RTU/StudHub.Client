'use client';

import type { OutputData } from '@editorjs/editorjs';
import EditorJS from '@editorjs/editorjs';
import { useEffect, useId, useRef, useState } from 'react';

import './editor.style.css';
import { BASE_EDITOR_CONFIG } from './editorjs.config';

type EditorType = {
    value?: OutputData;
    onChange: (data: OutputData) => void;
    placeholder?: string | false;
};

export function Editor({ value, onChange, placeholder }: EditorType) {
    const id = useId();
    const ref = useRef<EditorJS>(null);

    const [vw, setValue] = useState<VisualViewport | null>(null);

    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder: id,
                tools: {
                    ...BASE_EDITOR_CONFIG,
                    paragraph: {
                        config: {
                            placeholder,
                        },
                    },
                },
                // placeholder,
                autofocus: true,
                data: value,
                async onChange(api) {
                    const data = await api.saver.save();
                    onChange(data);
                },
                style: {},
            });

            ref.current = editor;
        }

        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);

    const updateToolbarPosition = () => {
        const toolbar = document.querySelector<HTMLDivElement>('.ce-inline-toolbar');
        const viewport = window.visualViewport;
        // console.log(toolbar, viewport);
        if (toolbar && viewport) {
            setValue(() => viewport);
            const toolbarPosition = viewport?.height + viewport?.offsetTop - 46;
            toolbar.style.transform = `translateY(${toolbarPosition}px)`;
            // console.log(viewport?.height, toolbarPosition);
        }
    };

    useEffect(() => {
        window.visualViewport?.addEventListener('resize', updateToolbarPosition);
        window.visualViewport?.addEventListener('scroll', updateToolbarPosition);

        return () => {
            window.visualViewport?.removeEventListener('resize', updateToolbarPosition);
            window.visualViewport?.removeEventListener('scroll', updateToolbarPosition);
        };
    }, []);

    return (
        <>
            <p>
                {vw?.height} | {vw?.offsetTop} | {vw?.pageTop}
            </p>
            <div id={id} />
        </>
    );
}
