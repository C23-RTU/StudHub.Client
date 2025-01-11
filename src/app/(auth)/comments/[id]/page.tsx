import { type Metadata } from 'next';

import { Comments } from './Comments';

export const metadata: Metadata = {
    title: 'Комментарии',
    description: 'Комментарии',
};

export const dynamic = 'force-static';
export const revalidate = 100;

const Page = ({}) => {
    return <Comments />;
};

export default Page;
