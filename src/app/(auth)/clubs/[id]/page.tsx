import type { Metadata } from 'next';

import { Club } from './Club';

export const metadata: Metadata = {
    title: 'Клуб',
    description: 'Страница клуба',
};

const Page = () => {
    return <Club />;
};

export default Page;