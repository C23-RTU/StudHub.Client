import { cache } from 'react';

import { clubsApi } from '@/api/api';

import { Club } from './Club';
import ClubNotFound from './ClubNotFound';

const getClubsGetByIdMemo = cache(async (id: string) => {
    return (await clubsApi.clubsGetById(Number(id))).data;
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const club = await getClubsGetByIdMemo(id);
        return {
            title: `${club.name} - Клуб`,
            description: club.about || 'Страница клуба',
        };
    } catch {
        return {
            title: 'Клуб не найден',
            description: '',
        };
    }
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const id = (await props.params).id;

    try {
        const club = await getClubsGetByIdMemo(id);
        return <Club club={club} />;
    } catch {
        return <ClubNotFound />;
    }
}
