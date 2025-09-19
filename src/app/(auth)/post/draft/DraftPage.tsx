'use client';

import type { OutputData } from '@editorjs/editorjs/types/data-formats/output-data';
import { SaveIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

const EditorDynamic = dynamic(() => import('@/components/ui/TextEditor/Editor').then((mod) => mod.Editor), {
    ssr: false,
});

interface IPostForm {
    title: string;
    content: object;
}

export function DraftPage() {
    const router = useRouter();
    const [data, setData] = useState<OutputData | undefined>();

    const { register, setValue, handleSubmit } = useForm<IPostForm>({
        mode: 'onChange',
    });

    const submit: SubmitHandler<IPostForm> = (data) => {
        console.log(data);
    };

    return (
        <Page>
            <Header>
                <div className="flex w-full flex-row items-center gap-4">
                    <BackButton onClick={() => router.back()} />
                    <HeaderTitle>Создание</HeaderTitle>
                </div>
            </Header>
            <MainContent className="mb-0 px-2">
                <form onSubmit={handleSubmit(submit)} className="flex w-full flex-col">
                    <Input
                        className="active:none border-none bg-transparent px-0 !text-2xl font-bold placeholder:text-[#707684] focus:shadow-none focus:ring-0"
                        placeholder="Заголовок поста..."
                        {...register('title')}
                    />
                    <EditorDynamic
                        value={data}
                        onChange={(payload) => setValue('content', payload)}
                        placeholder="Напиши свой изумительный пост..."
                    />
                    <Button>
                        Опубликовать <SaveIcon />
                    </Button>
                </form>
            </MainContent>
        </Page>
    );
}
