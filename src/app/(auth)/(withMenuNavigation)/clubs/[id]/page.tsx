import { cache } from 'react';

import { clubsApi } from '@/api/api';

import { Club } from './Club';
import ClubNotFound from './ClubNotFound';

const getClubsGetByIdMemo = cache(async (id: string) => {
    return (await clubsApi.clubsGetById(Number(id))).data;
});

export async function generateMetadata({ params }: { params: { id: string } }) {
    try {
        const id = params.id;
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

export default async function Page(props: { params: { id: string } }) {
    const id = props.params.id;

    try {
        const club = await getClubsGetByIdMemo(id);
        return <Club club={club} />;
    } catch {
        return <ClubNotFound />;
    }
}
