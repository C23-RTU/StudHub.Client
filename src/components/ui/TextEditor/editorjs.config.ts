import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';
import EditorjsList from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

export const BASE_EDITOR_CONFIG: {
    [toolName: string]: ToolConstructable | ToolSettings;
} = {
    paragraph: {
        class: Paragraph as unknown as ToolConstructable,
        inlineToolbar: true,
    },
    List: {
        class: EditorjsList as unknown as ToolConstructable,
        inlineToolbar: true,
        config: {
            defaultStyle: 'ordered',
            maxLevel: 1,
            counterTypes: ['numeric'],
        },
        toolbox: [
            {
                data: { style: 'unordered' },
            },
            {
                data: { style: 'ordered' },
            },
        ],
    },
};
