import type { Metadata } from 'next';

import { Calendar } from './Calendar';

export const metadata: Metadata = {
    title: 'Календарь событий',
    description: 'Календарь со всеми событиями',
};

export default async function Page() {
    return <Calendar />;
}
