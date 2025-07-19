'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import { COLORS } from '@/lib/constants/color.constant';

import { MENU_LINKS } from './menu-links';

export function MenuNavigation() {
    const pathname = usePathname();

    return (
        <div className="h-menuNavigation fixed bottom-0 left-1/2 z-50 flex w-full max-w-[1024px] -translate-x-1/2 items-center justify-between border-t border-neutral-800 bg-neutral-900 px-6">
            {MENU_LINKS.map(({ Icon, link }, index) => (
                <Link href={link} key={index}>
                    <Icon color={match(link)(pathname) ? COLORS.blue : COLORS.inactive} size={24} />
                </Link>
            ))}
        </div>
    );
}
