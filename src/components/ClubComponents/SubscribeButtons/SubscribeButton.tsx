import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { VariantProps } from 'class-variance-authority';
import { SquareCheck, SquarePlus } from 'lucide-react';
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
    subscribed: boolean | undefined;
    className?: string;
    size?: VariantProps<typeof Button>['size'];
}) {
    const queryClient = useQueryClient();
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    const { mutateAsync: toggleSubscription, isPending: isSubscribePending } = useMutation({
        mutationKey: ['club-toggle-subscribe', clubId],
        mutationFn: async () => await clubsApi.clubsToggleSubscription(Number(clubId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch-clubs'] });
            queryClient.setQueryData(['fetch-club', clubId], (oldData: ClubDetailDTO | undefined) => {
                return {
                    ...oldData,
                    subscriberCount: subscribed
                        ? (oldData?.subscriberCount as number) - 1
                        : (oldData?.subscriberCount as number) + 1,
                    isUserSubscribed: !subscribed,
                };
            });
        },
    });

    const handleSubscribe = useCallback(async () => {
        await toggleSubscription();
        toast.success('Вы подписались на клуб', { id: 'subscribe-toast' });
    }, [toggleSubscription]);

    const buttonClass = useMemo(
        () => cn('font-geologica text-text flex w-fit justify-center', isBig && 'p-3', className),
        [isBig, className]
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
                aria-pressed={isSubscribePending}
                disabled={isSubscribePending}
                title={label}
            >
                {isBig && <span>{label}</span>}
                <Icon />
            </Button>
            <UnsubSheetDynamic
                unsubVisible={unsubVisible}
                setUnsubVisible={setUnsubVisible}
                onClick={unsubSheetHandler}
            />
        </Fragment>
    );
}
