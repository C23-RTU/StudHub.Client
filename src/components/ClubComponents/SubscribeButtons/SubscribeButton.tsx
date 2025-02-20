'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SquareCheck, SquarePlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { clubsApi } from '@/api/api';

import { Button } from '../../ui/button';

import { UnsubSheet } from './UnsubSheet';

export function SubscribeButton({ clubId }: { clubId: string }) {
    const queryClient = useQueryClient();
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    const { data: club, isLoading } = useQuery({
        queryKey: ['check-subscription', clubId],
        queryFn: async () => (await clubsApi.clubsGetById(Number(clubId))).data,
    });

    const subscribed = useMemo(() => club?.isUserSubscribed ?? false, [club]);

    const { mutateAsync: subscribeMutation, isPending: isSubscribePending } = useMutation({
        mutationKey: ['club-subscribe', clubId],
        mutationFn: async () => await clubsApi.clubsToggleSubscription(Number(clubId)),
        onSuccess: () => {
            toast.success('Вы подписались на клуб');
            queryClient.invalidateQueries({ queryKey: ['check-subscription', clubId] });
        },
    });

    const { mutateAsync: unsubscribeMutation, isPending: isUnsubscribePending } = useMutation({
        mutationKey: ['club-unsubscribe', clubId],
        mutationFn: async () => await clubsApi.clubsToggleSubscription(Number(clubId)),
        onSuccess: () => {
            setUnsubVisible(false);
            toast.success('Вы отписались от клуба');
            queryClient.invalidateQueries({ queryKey: ['check-subscription', clubId] });
        },
    });

    return (
        <figure>
            <div className="flex justify-center">
                {isLoading ? (
                    <Button className="my-5 w-full flex justify-center bg-secondary" disabled>
                        <span>Загрузка...</span>
                    </Button>
                ) : subscribed ? (
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
            <UnsubSheet
                unsubVisible={unsubVisible}
                setUnsubVisible={setUnsubVisible}
                onClick={async () => await unsubscribeMutation()}
            />
        </figure>
    );
}
