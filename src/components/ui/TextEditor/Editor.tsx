'use client';

import type { OutputData } from '@editorjs/editorjs';
import EditorJS from '@editorjs/editorjs';
import { useEffect, useId, useRef } from 'react';

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

    useEffect(() => {
        function handleResize() {
            const toolbar = document.querySelector<HTMLDivElement>('.ce-popover__container');
            const { innerHeight: height } = window;

            if (toolbar) {
                toolbar.style!.transform = `translateY(${height - 49}px)`;
            }
            console.log(height);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div id={id} />
        </>
    );
}
