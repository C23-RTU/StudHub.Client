import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MdCollectionsBookmark } from 'react-icons/md';

import RegistrationForm from './form';

export const metadata: Metadata = {
    title: 'Регистрация',
    description: '',
};

export default async function RegistrationPage() {
    return (
        <main className="w-full h-[100svh] flex justify-center items-center">
            <div className="flex flex-col gap-4 m-auto items-center">
                <MdCollectionsBookmark size={100} />
                <p className="font-geologica text-2xl font-bold text-center">Регистрация</p>
                <Suspense>
                    <RegistrationForm />
                </Suspense>
            </div>
        </main>
    );
}
