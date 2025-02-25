'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SquareCheck, SquarePlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { clubsApi } from '@/api/api';

import { Button } from '../../ui/button';

import { UnsubSheet } from './UnsubSheet';

export function SubscribeButton({ clubId, isBig = true }: { clubId: string; isBig: boolean }) {
    const queryClient = useQueryClient();
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    const { data: club, isLoading } = useQuery({
        queryKey: ['check-subscription', clubId],
        queryFn: async () => (await clubsApi.clubsGetById(Number(clubId))).data,
    });

    const subscribed = useMemo(() => club?.isUserSubscribed ?? false, [club]);

    const { mutateAsync: toggleSubscription, isPending: isSubscribePending } = useMutation({
        mutationKey: ['club-toggle-subscribe', clubId],
        mutationFn: async () => await clubsApi.clubsToggleSubscription(Number(clubId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['check-subscription', clubId] });
        },
    });

    return (
        <figure>
            <div className="flex justify-center">
                {isLoading && isBig ? (
                    <Button className="my-5 w-full flex justify-center bg-secondary" disabled>
                        <span>Загрузка...</span>
                    </Button>
                ) : subscribed ? (
                    <Button
                        onClick={() => setUnsubVisible(true)}
                        className={`w-full flex bg-secondary justify-center hover:bg-accent ${isBig ? 'my-5' : 'p-3'}`}
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
                        className={`w-full flex justify-center bg-primary hover:bg-primary/80 ${isBig ? 'my-5' : 'p-3'}`}
                        disabled={isSubscribePending}
                    >
                        {isBig && <span>Вступить</span>}
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
