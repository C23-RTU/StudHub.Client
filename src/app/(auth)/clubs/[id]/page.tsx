import type { Metadata } from 'next';

import { Club } from './Club';

export const metadata: Metadata = {
    title: 'Клуб',
    description: 'Страница клуба',
};

export default async function Page({ params }: { params: { id: string } }) {
    return <Club id={params.id} />;
}
