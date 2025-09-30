'use client';

import { LuPlus } from 'react-icons/lu';

import { Menu, MenuLink } from '@/components/ui/menu';
import { SkeletonList } from '@/components/ui/skeleton';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useOwnedClubs } from '@/app/(auth)/(withMenuNavigation)/profile/settings/useOwnedClubs';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

export default function UserClubs() {
    const { data: ownedClubs, isLoading } = useOwnedClubs();
    return (
        <Menu className="overflow-hidden">
            {isLoading && (
                <SkeletonList className="gap-[2px]" count={2} classNameSkeletonItem="rounded-none h-[48px]" />
            )}
            {!isLoading &&
                ownedClubs?.map((club) => (
                    <MenuLink
                        key={club.id}
                        title={club.name}
                        href={AUTH_PAGE.SETTING_CLUB(club.id)}
                        imageSrc={getStaticImg(club.bannerUrl ?? '')}
                        imageAlt={club.name}
                    />
                ))}
            <MenuLink href={AUTH_PAGE.PROFILE_CREATE_CLUB} title="Создать клуб" Icon={LuPlus} />
        </Menu>
    );
}
