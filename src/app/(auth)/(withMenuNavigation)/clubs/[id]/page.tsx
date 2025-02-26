import { clubsApi } from '@/api/api';

import { Club } from './Club';
import ClubNotFound from './ClubNotFound';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const club = (await clubsApi.clubsGetById(Number(id))).data;
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
        await clubsApi.clubsGetById(Number(id));
        return <Club id={id} />;
    } catch {
        return <ClubNotFound />;
    }
}
