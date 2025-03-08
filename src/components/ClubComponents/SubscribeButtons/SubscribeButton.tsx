'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SquareCheck, SquarePlus } from 'lucide-react';
import { useState } from 'react';

import { clubsApi } from '@/api/api';
import type { ClubDetailDTO } from '@/api/axios-client/models';

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
            queryClient.invalidateQueries({ queryKey: ['fetch-clubs'] });
            queryClient.setQueryData(['fetch-club', clubId], (oldData: ClubDetailDTO | undefined) => {
                if (subscribed)
                    return {
                        ...oldData,
                        subscriberCount: (oldData?.subscriberCount as number) - 1,
                        isUserSubscribed: false,
                    };
                else
                    return {
                        ...oldData,
                        subscriberCount: (oldData?.subscriberCount as number) + 1,
                        isUserSubscribed: true,
                    };
            });
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
                            const { toast } = await import('react-hot-toast');
                            toast.success('Вы подписались на клуб', { id: 'subscribe-toast' });
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
                    const { toast } = await import('react-hot-toast');
                    toast.success('Вы отписались от клуба', { id: 'unsubscribe-toast' });
                }}
            />
        </figure>
    );
}
