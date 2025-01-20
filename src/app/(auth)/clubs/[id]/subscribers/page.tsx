import type { Metadata } from 'next';

import { Subscribers } from './Subscribers';

export const metadata: Metadata = {
    title: 'Подписчики клуба',
    description: 'Страница подписчиков клуба',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return <Subscribers id={id} />;
}
