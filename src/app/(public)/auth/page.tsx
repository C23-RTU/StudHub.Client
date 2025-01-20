import type { Metadata } from 'next';

import Auth from './Auth';

export const metadata: Metadata = {
    title: 'Авторизация',
    description: 'Страница входа и регистрации',
};

export default async function RegistrationPage() {
    return (
        <main className="w-full h-[100svh] flex justify-center px-pageX max-w-[1024px] m-auto">
            <div className="flex flex-col gap-4 w-full">
                <Auth />
            </div>
        </main>
    );
}
