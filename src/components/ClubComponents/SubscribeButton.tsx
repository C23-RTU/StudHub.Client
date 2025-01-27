'use client';

import { SquareCheck, SquarePlus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

export function SubscribeButton() {
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    return (
        <figure className="">
            <div className="flex justify-center">
                {subscribed ? (
                    <Button
                        onClick={() => {
                            setUnsubVisible(true);
                        }}
                        className="my-5 w-full flex justify-center bg-secondary hover:bg-accent"
                    >
                        <span>Вы подписаны</span>
                        <SquarePlus />
                    </Button>
                ) : (
                    <Button onClick={() => setSubscribed(true)} className="my-5 w-full flex justify-center">
                        <span>Вступить</span>
                        <SquareCheck />
                    </Button>
                )}
            </div>
            <Sheet open={unsubVisible} onOpenChange={setUnsubVisible}>
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
        </figure>
    );
}
