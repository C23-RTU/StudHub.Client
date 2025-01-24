import type { Metadata } from 'next';

import { Club } from './Club';

export const metadata: Metadata = {
    title: 'Клуб',
    description: 'Страница клуба',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    return <Club id={params.id} />;
}
