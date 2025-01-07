import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MdCollectionsBookmark } from 'react-icons/md';

import LoginForm from './form';

export const metadata: Metadata = {
    title: 'Авторизация',
    description: '',
};

export default async function LoginPage() {
    return (
        <main className="w-full h-[100svh] flex justify-center items-center">
            <div className="flex flex-col gap-4 m-auto items-center">
                {/* Поставлю здесь это, ибо лень ее из фигмы достать */}
                <MdCollectionsBookmark size={100} />
                <p className="font-geologica text-2xl font-bold text-center">Авторизация</p>
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}
