import { Button } from '../ui/button';
import { ResponsiveDialog } from '../ui/responsive-dialog';

import { useManageClub } from './hooks/useManageClub';
import { useSettingClubStore } from './store/useSettingClubStore';

export function RemovePopup({ clubId }: { clubId: number }) {
    const { revokeAdminRights, revokeRightsMutation } = useManageClub(clubId);

    const userToRemove = useSettingClubStore((store) => store.userToRemove);
    const setUserToRemove = useSettingClubStore((store) => store.setUserToRemove);

    const closeHandler = () => setUserToRemove(null);

    return (
        <ResponsiveDialog open={!!userToRemove} onOpenChange={closeHandler}>
            <ResponsiveDialog.Header>
                <ResponsiveDialog.Title>Подтвердите удаление?</ResponsiveDialog.Title>
                <ResponsiveDialog.Description>
                    Вы уверены, что хотите удалить пользователя{' '}
                    <b className="text-white italic">
                        {userToRemove?.lastName} {userToRemove?.firstName}
                    </b>{' '}
                    из спика администраторов клуба?
                </ResponsiveDialog.Description>
            </ResponsiveDialog.Header>
            <ResponsiveDialog.Footer className="flex">
                <Button
                    isLoading={revokeRightsMutation.isPending}
                    onClick={async () => {
                        if (!userToRemove) return;
                        await revokeAdminRights(userToRemove.id);
                        closeHandler();
                    }}
                    variant={'destructive'}
                >
                    Да, удалить
                </Button>
                <Button variant="outline" onClick={closeHandler}>
                    Отменить
                </Button>
            </ResponsiveDialog.Footer>
        </ResponsiveDialog>
    );
}
