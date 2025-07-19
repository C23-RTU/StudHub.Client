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
                        <SheetDescription className="text-lg text-neutral-50">
                            Вы хотите отписаться от клуба?
                        </SheetDescription>
                    </SheetTitle>
                </SheetHeader>
                <Button className="mx-auto mt-3 w-full justify-center" onClick={onClick}>
                    Отписаться
                </Button>
            </SheetContent>
        </Sheet>
    );
}
