'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SquareCheck, SquarePlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { clubsApi } from '@/api/api';

import { Button } from '../../ui/button';

import { UnsubSheet } from './UnsubSheet';

export function SmallSubscribeButton({ clubId }: { clubId: number }) {
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const { data: club } = useQuery({
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
                {subscribed ? (
                    <Button
                        onClick={() => {
                            setUnsubVisible(true);
                        }}
                        className="bg-secondary hover:bg-accent p-3"
                        disabled={isUnsubscribePending || isSubscribePending}
                    >
                        <SquareCheck />
                    </Button>
                ) : (
                    <Button
                        onClick={async () => await subscribeMutation()}
                        className="p-3"
                        disabled={isUnsubscribePending || isSubscribePending}
                    >
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
