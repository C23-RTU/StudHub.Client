'use client';

import type { OutputData } from '@editorjs/editorjs/types/data-formats/output-data';
import { SaveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { BackButton } from '../ui/BackButton/BackButton';
import { Editor } from '../ui/TextEditor/Editor';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function PostTextEditor({ toggleOpen }: { toggleOpen: (flag: boolean) => void }) {
    const [data, setData] = useState<OutputData | undefined>();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    console.log(data);

    return (
        <div className="page bg-background fixed top-0 right-0 bottom-0 left-0 z-100 overflow-hidden">
            <div className="mx-auto max-w-[1024px]">
                <Header>
                    <div className="flex flex-row items-center gap-4">
                        <BackButton onClick={() => toggleOpen(false)} />
                        <HeaderTitle>Создание</HeaderTitle>
                    </div>
                    <Button className="h-10 w-10" onClick={() => toggleOpen(false)}>
                        <SaveIcon />
                    </Button>
                </Header>
                <MainContent className="mb-0 h-[calc(100svh-101px)] overflow-scroll">
                    <Input
                        className="active:none border-none bg-transparent px-0 !text-2xl font-bold placeholder:text-[#707684] focus:shadow-none focus:ring-0"
                        placeholder="Заголовок поста..."
                    />
                    <Editor
                        value={data}
                        onChange={(payload) => setData(payload)}
                        placeholder="Напиши свой изумительный пост..."
                    />
                </MainContent>
            </div>
        </div>
    );
}
