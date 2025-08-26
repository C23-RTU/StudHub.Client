import type { Dispatch, SetStateAction } from 'react';

import { ResponsiveDialog } from '@/components/ui/responsive-dialog';

import { Button } from '../../ui/button';

type Props = {
    unsubVisible: boolean;
    setUnsubVisible: Dispatch<SetStateAction<boolean>>;
    onClick: () => void;
};

export function UnsubSheet({ unsubVisible = false, setUnsubVisible, onClick }: Props) {
    return (
        <ResponsiveDialog open={unsubVisible} onOpenChange={setUnsubVisible}>
            <ResponsiveDialog.Header>
                <ResponsiveDialog.Title>Вы хотите отписаться от клуба?</ResponsiveDialog.Title>
                <ResponsiveDialog.Description className="text-md text-neutral-500">
                    Посты этого клуба больше не будут появлятся на вашей главной странице.
                </ResponsiveDialog.Description>
            </ResponsiveDialog.Header>
            <ResponsiveDialog.Footer className="">
                <Button onClick={onClick}>Отписаться</Button>
                <Button variant="outline" onClick={() => setUnsubVisible(false)}>
                    Отменить
                </Button>
            </ResponsiveDialog.Footer>
        </ResponsiveDialog>
    );
}
