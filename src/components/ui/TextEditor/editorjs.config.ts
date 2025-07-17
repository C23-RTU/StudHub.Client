import Delimiter from '@editorjs/delimiter';
import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import EditorjsList from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

export const BASE_EDITOR_CONFIG: {
    [toolName: string]: ToolConstructable | ToolSettings;
} = {
    header: {
        class: Header as unknown as ToolConstructable,
        config: {
            levels: [2, 3, 4],
            defaultLevel: 2,
        },
    },
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
    },
    delimiter: Delimiter,
    image: {
        class: ImageTool,
        config: {
            uploader: {
                uploadByFile: (file: File) => {
                    return {
                        success: 1,
                        file: {
                            url: URL.createObjectURL(file),
                            raw: file,
                        },
                    };
                },
            },
            features: {
                border: false,
                caption: 'optional',
                stretch: false,
            },
        },
    },
};
