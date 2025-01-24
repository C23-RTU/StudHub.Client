import type { Metadata } from 'next';

import { Finder } from './Finder';

export const metadata: Metadata = {
    title: 'Ищу друга',
    description: '',
};

const Page = () => {
    return <Finder />;
};

export default Page;
