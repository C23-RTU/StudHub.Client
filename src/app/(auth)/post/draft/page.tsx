import type { Metadata } from 'next/types';

import { DraftPage } from './DraftPage';

export const metadata: Metadata = {
    title: 'Текстовый редактор',
    description: 'Редактор поста',
};

const Page = ({}) => {
    return <DraftPage />;
};

export default Page;
