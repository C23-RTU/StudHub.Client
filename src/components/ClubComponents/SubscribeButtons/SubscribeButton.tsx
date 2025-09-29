'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { VariantProps } from 'class-variance-authority';
import { Loader2, SquareCheck, SquarePlus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Fragment, useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { clubsApi } from '@/api/api';
import type { ClubDetailDTO } from '@/api/axios-client/models';

import { Button } from '../../ui/button';

import { cn } from '@/lib/utils/utils';

const UnsubSheetDynamic = dynamic(() => import('./UnsubSheet').then((mod) => mod.UnsubSheet), {
    ssr: false,
});

export function SubscribeButton({
    clubId,
    isBig = true,
    subscribed = false,
    size = 'default',
    className = '',
}: {
    clubId: number;
    isBig: boolean;
    subscribed?: boolean;
    className?: string;
    size?: VariantProps<typeof Button>['size'];
}) {
    const queryClient = useQueryClient();
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    const { mutateAsync: toggleSubscription, isPending: isSubscribePending } = useMutation({
        mutationKey: ['club-toggle-subscribe', clubId],
        mutationFn: async () => await clubsApi.clubsToggleSubscription(Number(clubId)),
        onSuccess: async () => {
            queryClient.setQueryData(['fetch-club', clubId], (oldData: ClubDetailDTO | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    subscriberCount: subscribed
                        ? (oldData.subscriberCount ?? 0) - 1
                        : (oldData.subscriberCount ?? 0) + 1,
                    isUserSubscribed: !subscribed,
                };
            });

            await queryClient.invalidateQueries({ queryKey: ['fetch-clubs'] });
        },
        onError: (error) => {
            toast.error('Не удалось выполнить действие');
            console.error('Subscription error:', error);
        },
    });

    const handleSubscribe = useCallback(async () => {
        await toggleSubscription();
        toast.success('Вы подписались на клуб', { id: 'subscribe-toast' });
    }, [toggleSubscription]);

    const buttonClass = useMemo(
        () => cn('font-geologica flex w-fit justify-center', subscribed ? 'text-text' : 'text-white', className),
        [className, subscribed]
    );

    const unsubSheetHandler = useCallback(async () => {
        await toggleSubscription();
        setUnsubVisible(false);
        toast.success('Вы отписались от клуба', { id: 'unsubscribe-toast' });
    }, [toggleSubscription]);

    const Icon = subscribed ? SquareCheck : SquarePlus;
    const label = subscribed ? 'Вы подписаны' : 'Подписаться';

    return (
        <Fragment>
            <Button
                onClick={subscribed ? () => setUnsubVisible(true) : handleSubscribe}
                size={size}
                variant={subscribed ? 'outline' : 'default'}
                className={cn(buttonClass, subscribed ? '' : 'hover:bg-primary')}
                aria-busy={isSubscribePending}
                aria-pressed={subscribed}
                disabled={isSubscribePending}
                title={label}
            >
                {isSubscribePending ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        {isBig && <span>{label}</span>}
                        <Icon />
                    </>
                )}
            </Button>
            <UnsubSheetDynamic
                unsubVisible={unsubVisible}
                setUnsubVisible={setUnsubVisible}
                onClick={unsubSheetHandler}
            />
        </Fragment>
    );
}
