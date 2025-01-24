import type { Metadata } from 'next';

import { Clubs } from './Clubs';

export const metadata: Metadata = {
    title: 'Поиск клубов',
    description: '',
};

const Page = () => {
    return <Clubs />;
};

export default Page;
