import type { ClubDetailDTO } from '@/api/axios-client';

import { Club } from './Club';
import ClubNotFound from '@/app/(auth)/(withMenuNavigation)/clubs/[id]/ClubNotFound';
import { getClubGetByIdAction } from '@/server-actions/actions/clubs.action';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const club = await getClubGetByIdAction(id);
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
        const club: ClubDetailDTO = await getClubGetByIdAction(id);
        console.log(club);
        return <Club club={club} />;
    } catch {
        return <ClubNotFound />;
    }
}
