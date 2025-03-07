'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SquareCheck, SquarePlus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { clubsApi } from '@/api/api';

import { Button } from '../../ui/button';

import { UnsubSheet } from './UnsubSheet';

export function SubscribeButton({
    clubId,
    isBig = true,
    subscribed = false,
}: {
    clubId: string;
    isBig: boolean;
    subscribed: boolean | undefined;
}) {
    const queryClient = useQueryClient();
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    const { mutateAsync: toggleSubscription, isPending: isSubscribePending } = useMutation({
        mutationKey: ['club-toggle-subscribe', clubId],
        mutationFn: async () => await clubsApi.clubsToggleSubscription(Number(clubId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch-club', clubId] });
            queryClient.invalidateQueries({ queryKey: ['fetch-clubs'] });
        },
    });

    return (
        <figure>
            <div className="flex justify-center">
                {subscribed ? (
                    <Button
                        onClick={() => setUnsubVisible(true)}
                        className={`w-full flex bg-secondary font-geologica justify-center hover:bg-accent ${isBig ? 'my-5' : 'p-3'}`}
                        disabled={isSubscribePending}
                    >
                        {isBig && <span>Вы подписаны</span>}
                        <SquareCheck />
                    </Button>
                ) : (
                    <Button
                        onClick={async () => {
                            await toggleSubscription();
                            toast.success('Вы подписались на клуб');
                        }}
                        className={`w-full flex justify-center font-geologica bg-primary hover:bg-primary/80 ${isBig ? 'my-5' : 'p-3'}`}
                        disabled={isSubscribePending}
                    >
                        {isBig && <span>Подписаться</span>}
                        <SquarePlus />
                    </Button>
                )}
            </div>
            <UnsubSheet
                unsubVisible={unsubVisible}
                setUnsubVisible={setUnsubVisible}
                onClick={async () => {
                    await toggleSubscription();
                    setUnsubVisible(false);
                    toast.success('Вы отписались от клуба');
                }}
            />
        </figure>
    );
}
