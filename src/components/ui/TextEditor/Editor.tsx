'use client';

import type { OutputData } from '@editorjs/editorjs';
import EditorJS from '@editorjs/editorjs';
import { useEffect, useId, useRef } from 'react';

import { BASE_EDITOR_CONFIG } from './editorjs.config';
import { useMobileToolbar } from './hook/useMobileToolbar';
import { isMobile } from '@/lib/helpers/isMobile.helper';

type EditorType = {
    value?: OutputData;
    onChange: (data: OutputData) => void;
    placeholder?: string | false;
};

export function Editor({ value, onChange, placeholder }: EditorType) {
    const id = useId();
    const ref = useRef<EditorJS>(null);

    const { loadMobileToolbarEvent, unsubscribeToolbarEvent } = useMobileToolbar();

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
                async onReady() {
                    if (isMobile()) await loadMobileToolbarEvent();
                },
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
                if (isMobile()) unsubscribeToolbarEvent();
            }
        };
    }, []);

    return <div id={id} />;
}
