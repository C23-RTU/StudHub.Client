import type { Metadata } from 'next';

import { Subscribers } from './Subscribers';

export const metadata: Metadata = {
    title: 'Подписчики клуба',
    description: 'Страница подписчиков клуба',
};

export default async function Page({ params }: { params: { id: string } }) {
    return <Subscribers id={params.id} />;
}