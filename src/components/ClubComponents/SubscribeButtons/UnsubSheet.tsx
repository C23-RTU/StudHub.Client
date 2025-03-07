import type { Dispatch, SetStateAction } from 'react';

import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../ui/sheet';

type Props = {
    unsubVisible: boolean;
    setUnsubVisible: Dispatch<SetStateAction<boolean>>;
    onClick: () => void;
};

export function UnsubSheet({ unsubVisible = false, setUnsubVisible, onClick }: Props) {
    return (
        <Sheet open={unsubVisible} onOpenChange={setUnsubVisible}>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle className="text-center">
                        <SheetDescription className='text-neutral-50 text-lg'>Вы хотите отписаться от клуба?</SheetDescription>
                    </SheetTitle>
                </SheetHeader>
                <Button className="w-full justify-center mx-auto mt-3" onClick={onClick}>
                    Отписаться
                </Button>
            </SheetContent>
        </Sheet>
    );
}
