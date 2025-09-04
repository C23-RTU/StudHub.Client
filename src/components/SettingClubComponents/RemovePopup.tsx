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
                <ResponsiveDialog.Title className="mb-3 text-center text-xl uppercase">
                    Подтвердите удаление?
                </ResponsiveDialog.Title>
                <ResponsiveDialog.Description className="text-center text-neutral-500">
                    Вы уверены, что хотите удалить пользователя{' '}
                    <b className="text-white italic">
                        {userToRemove?.lastName} {userToRemove?.firstName}
                    </b>{' '}
                    из спика администраторов клуба?
                </ResponsiveDialog.Description>
            </ResponsiveDialog.Header>
            <ResponsiveDialog.Footer className="flex">
                <Button
                    className="flex-1"
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
                <Button variant="outline" className="flex-[0.5]" onClick={closeHandler}>
                    Отменить
                </Button>
            </ResponsiveDialog.Footer>
        </ResponsiveDialog>
    );
}
