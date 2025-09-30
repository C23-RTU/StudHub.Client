import type { Metadata } from 'next';

import Settings from './Settings';

export const metadata: Metadata = {
    title: 'Настройки профиля',
    description: 'Настройки вашего аккаунта и приложения',
};

export const dynamic = 'force-static';

export default async function Page() {
    return <Settings />;
}
