import { SettingClubPage } from './SettingClubPage';
import { getClubGetByIdAction } from '@/server-actions/actions/clubs.action';

const Page = async (props: { params: Promise<{ id: string }> }) => {
    const id = (await props.params).id;

    const club = await getClubGetByIdAction(id);
    return <SettingClubPage baseClubInfo={club} />;
};

export default Page;
