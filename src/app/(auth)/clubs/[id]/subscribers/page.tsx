import type { Metadata } from 'next';

import { Subscribers } from './Subscribers';

export const metadata: Metadata = {
    title: 'Подписчики клуба',
    description: 'Страница подписчиков клуба',
};

const Page = () => {
    return <Subscribers />;
};

export default Page;