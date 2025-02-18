'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { SquareCheck, SquarePlus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { clubsApi } from '@/api/api';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';

export function SubscribeButton({ clubId }: { clubId: string }) {
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    useQuery({
        queryKey: ['check-subscription', clubId],
        queryFn: async () => {
            const data = await clubsApi.clubsGetAllByPersonId(Number(clubId));
            console.log(data);
            if (data) setSubscribed(true);
            return null; // чтобы не ругался
        },
    });

    const { mutateAsync: subscribeMutation, isPending: isSubscribePending } = useMutation({
        mutationKey: ['club-subscribe', clubId],
        mutationFn: async () => await clubsApi.clubsToggleSubscription(Number(clubId)),
        onSuccess: () => {
            setSubscribed(true);
            toast.success('Вы подписались на клуб');
        },
    });

    const { mutateAsync: unsubscribeMutation, isPending: isUnsubscribePending } = useMutation({
        mutationKey: ['club-unsubscribe', clubId],
        mutationFn: async () => await clubsApi.clubsToggleSubscription(Number(clubId)),
        onSuccess: () => {
            setSubscribed(false);
            setUnsubVisible(false);
            toast.success('Вы отписались от клуба');
        },
    });

    return (
        <figure>
            <div className="flex justify-center">
                {subscribed ? (
                    <Button
                        onClick={() => setUnsubVisible(true)}
                        className="my-5 w-full flex justify-center bg-secondary hover:bg-accent"
                        disabled={isSubscribePending || isUnsubscribePending}
                    >
                        <span>Вы подписаны</span>
                        <SquareCheck />
                    </Button>
                ) : (
                    <Button
                        onClick={async () => await subscribeMutation()}
                        className="my-5 w-full flex justify-center"
                        disabled={isSubscribePending || isUnsubscribePending}
                    >
                        <span>Вступить</span>
                        <SquarePlus />
                    </Button>
                )}
            </div>
            <Sheet open={unsubVisible} onOpenChange={setUnsubVisible}>
                <SheetContent side="bottom">
                    <SheetHeader>
                        <SheetTitle className="text-center">
                            <SheetDescription>Вы хотите отписаться от клуба?</SheetDescription>
                        </SheetTitle>
                    </SheetHeader>
                    <Button
                        className="w-full justify-center mx-auto mt-3"
                        onClick={async () => await unsubscribeMutation()}
                    >
                        Отписаться
                    </Button>
                </SheetContent>
            </Sheet>
        </figure>
    );
}
