import type { Metadata } from 'next';

import { Calendar } from './Calendar';

export const metadata: Metadata = {
    title: 'Календарь событий',
    description: '',
};

export default async function Page() {
    return <Calendar />;
}
