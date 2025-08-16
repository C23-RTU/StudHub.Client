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
            <Auth />
        </Suspense>
    );
}
