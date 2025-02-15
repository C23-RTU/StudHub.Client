'use client';

import { SquareCheck, SquarePlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

export function SmallSubscribeButton() {
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    return (
        <>
            <div className="flex justify-center">
                {subscribed ? (
                    <Button
                        onClick={() => {
                            setUnsubVisible(true);
                        }}
                        className="bg-secondary hover:bg-accent p-3"
                    >
                        <SquareCheck />
                    </Button>
                ) : (
                    <Button onClick={() => setSubscribed(true)} className="p-3">
                        <SquarePlus />
                    </Button>
                )}
            </div>
            <Sheet open={unsubVisible} onOpenChange={setUnsubVisible} modal={true}>
                <SheetContent side="bottom">
                    <SheetHeader>
                        <SheetTitle className="text-center">Вы хотите отписаться от клуба?</SheetTitle>
                    </SheetHeader>
                    <Button
                        className="w-full justify-center mx-auto mt-3"
                        onClick={() => {
                            setSubscribed(false);
                            setUnsubVisible(false);
                        }}
                    >
                        Отписаться
                    </Button>
                </SheetContent>
            </Sheet>
        </>
    );
}
