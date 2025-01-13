import type { Metadata } from 'next';
import { Suspense } from 'react';

import Auth from './Auth';

export const metadata: Metadata = {
    title: 'Авторизация',
    description: 'Страница входа и регистрации',
};

export default async function RegistrationPage() {
    return (
        <main className="w-full h-[100svh] flex justify-center items-center mt-6">
            <div className="flex flex-col gap-4 m-auto items-center">
                <img src="/img/logo.png" />
                <Suspense>
                    <Auth />
                </Suspense>
            </div>
        </main>
    );
}
