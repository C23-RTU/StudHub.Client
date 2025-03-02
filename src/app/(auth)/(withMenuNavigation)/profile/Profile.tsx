'use client';

import { SettingBadge } from '@/components/Badge/SettingBadge/SettingBadge';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { IdCard, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { AUTH_PAGE } from '@/lib/config/routes.config';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/api/api';
import { Skeleton } from '@/components/ui/skeleton';
import type { PersonDetailDTO } from '@/api/axios-client/models';

type Props = {
  user: PersonDetailDTO;
};

export default function Profile({ user }: Props) {
  const { data: clubs, isLoading: isLoadingClubs, error } = useQuery({
    queryKey: ['fetch-user-clubs'],
    queryFn: async () => (await userApi.userGetSubscribedClubs(0, 3)).data,
  });

  const userClubs = clubs ? clubs : [];

  return (
    <div className="page">
      <Header>
        <HeaderTitle>Профиль</HeaderTitle>
        <SettingBadge />
      </Header>

      <MainContent>
        <div className="flex flex-row gap-4">
          <Avatar src={user?.imagePath} size={80} alt={'Изображение профиля'} />
          <div className="flex flex-col my-auto gap-0">
            <p className="text-xl font-bold font-geologica max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-neutral-400">был недавно</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <MessageSquare size={20} />
            <p className="text-sm max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {user?.about || '...'}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <IdCard size={20} />
            <p className="text-sm max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {user?.institute?.name || "Нет института"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <p className="font-geologica font-bold text-lg">Подписки</p>
            <Link href={`${AUTH_PAGE.PROFILE_CLUBS}`} className="font-inter font-light text-primary">
              Показать все
            </Link>
          </div>
          {isLoadingClubs ? (
            <Skeleton className="h-40 w-full" />
          ) : userClubs.length === 0 ? (
            <p className="text-neutral-400 text-center">Вы пока не подписаны ни на один клуб</p>
          ) : (
            userClubs.map((club) => <ClubCard key={club.id} club={club} />)
          )}
          {error && <p className="text-neutral-400 text-center">Ошибка загрузки подписок</p>}
        </div>
      </MainContent>
    </div>
  );
}