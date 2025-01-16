import type { Metadata } from 'next';

import Auth from './Auth';
import type { registerData } from '@/schemas/registerSchema';

export const metadata: Metadata = {
    title: 'Авторизация',
    description: 'Страница входа и регистрации',
};

export default async function RegistrationPage() {
    async function handleRegister(data: registerData) {
        'use server'
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log('Регистрация успешна', responseData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="w-full h-[100svh] flex justify-center items-center px-pageX max-w-[1024px] m-auto">
            <div className="flex flex-col gap-4 w-full">
                <Auth handleRegister={handleRegister} />
            </div>
        </main>
    );
}
