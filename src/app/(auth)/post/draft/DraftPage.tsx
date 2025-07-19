'use client';

import type { OutputData } from '@editorjs/editorjs/types/data-formats/output-data';
import { SaveIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { BackButton } from '@/components/ui/BackButton/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

const EditorDynamic = dynamic(() => import('@/components/ui/TextEditor/Editor').then((mod) => mod.Editor), {
    ssr: false,
});

export function DraftPage() {
    const router = useRouter();
    const [data, setData] = useState<OutputData | undefined>();

    console.log(data);

    return (
        <div className="page mx-auto h-svh max-w-[1024px]">
            <Header>
                <div className="flex flex-row items-center gap-4">
                    <BackButton onClick={() => router.back()} />
                    <HeaderTitle>Создание</HeaderTitle>
                </div>
                <Button className="h-10 w-10">
                    <SaveIcon />
                </Button>
            </Header>
            <MainContent className="mb-0">
                <div className="bg-secondary flex h-20 w-full cursor-pointer items-center justify-center rounded">
                    Image uploader
                </div>

                <Input
                    className="active:none border-none bg-transparent px-0 !text-2xl font-bold placeholder:text-[#707684] focus:shadow-none focus:ring-0"
                    placeholder="Заголовок поста..."
                />
                <EditorDynamic
                    value={data}
                    onChange={(payload) => setData(payload)}
                    placeholder="Напиши свой изумительный пост..."
                />
            </MainContent>
        </div>
    );
}
