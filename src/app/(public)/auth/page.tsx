import type { Metadata } from 'next';
import { Suspense } from 'react';

import Auth from './Auth';

export const metadata: Metadata = {
    title: 'Авторизация',
    description: 'Страница входа и регистрации',
};

export default async function RegistrationPage() {
    return (
        <Suspense>
            <main className="w-full h-[100svh] flex justify-center px-pageX">
                <div className="flex flex-col gap-4 w-full">
                    <Auth />
                </div>
            </main>
        </Suspense>
    );
}
