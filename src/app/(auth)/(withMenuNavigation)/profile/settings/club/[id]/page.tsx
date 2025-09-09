import { redirect } from 'next/navigation';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { userApi } from '@/api/api';

import { SettingClubPage } from './SettingClubPage';
import { CLUB_ROLES } from '@/lib/enums/club-roles.enum';
import { getClubGetByIdAction } from '@/server-actions/actions/clubs.action';

const getRoles = async () => (await userApi.userGetClubRoles()).data;

const Page = async (props: { params: Promise<{ id: string }> }) => {
    const id = (await props.params).id;

    const roles = await getRoles();

    if (!roles[CLUB_ROLES.OWNER].includes(+id)) redirect(AUTH_PAGE.PROFILE);

    const club = await getClubGetByIdAction(id);
    return <SettingClubPage baseClubInfo={club} />;
};

export default Page;
