import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';
import Paragraph from '@editorjs/paragraph';
import Underline from '@editorjs/underline';

export const BASE_EDITOR_CONFIG: {
    [toolName: string]: ToolConstructable | ToolSettings;
} = {
    underline: Underline,
    paragraph: {
        class: Paragraph as unknown as ToolConstructable,
        inlineToolbar: true,
        config: {
            preserveBlank: true,
        },
    },
    // List: {
    //     class: EditorjsList as unknown as ToolConstructable,
    //     inlineToolbar: true,
    //     config: {
    //         defaultStyle: 'ordered',
    //         maxLevel: 1,
    //         counterTypes: ['numeric'],
    //     },
    //     toolbox: [
    //         {
    //             data: { style: 'unordered' },
    //         },
    //         {
    //             data: { style: 'ordered' },
    //         },
    //     ],
    // },
};
