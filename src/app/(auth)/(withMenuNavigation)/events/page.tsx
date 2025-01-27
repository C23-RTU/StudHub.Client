import type { Metadata } from 'next';

import { Events } from './Events';
import { events } from '@/data/events';

export const metadata: Metadata = {
    title: 'События',
    description: '',
};
export default async function Page() {
    return <Events events={events} />;
}
