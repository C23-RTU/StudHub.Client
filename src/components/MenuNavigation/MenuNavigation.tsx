'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import { COLORS } from '@/lib/constants/color.constant';

import { MENU_LINKS } from './menu-links';

export function MenuNavigation() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-1/2 flex h-menuNavigation w-full max-w-[1024px] z-50 -translate-x-1/2 items-center justify-between bg-secondary px-6">
            {MENU_LINKS.map(({ Icon, link }, index) => (
                <Link href={link} key={index}>
                    <Icon color={match(link)(pathname) ? COLORS.blue : COLORS.white} size={24} />
                </Link>
            ))}
        </div>
    );
}
