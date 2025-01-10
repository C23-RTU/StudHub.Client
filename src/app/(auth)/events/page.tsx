import type { Metadata } from 'next';

import { Events } from './Events';

export const metadata: Metadata = {
    title: 'События',
    description: '',
};

const Page = () => {
    return <Events />;
};

export default Page;
