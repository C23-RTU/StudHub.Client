'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import { COLORS } from '@/lib/constants/color.constant';

import { MENU_LINKS } from './menu-links';

export function MenuNavigation() {
    const pathname = usePathname();

    return (
        <div className="max-w-[1024px] h-menuNavigation bg-secondary w-full rounded-t-2xl fixed bottom-0 left-[50%] translate-x-[-50%] right-0 flex px-pageX justify-between items-center">
            {MENU_LINKS.map(({ Icon, link }, index) => (
                <Link href={link} key={index}>
                    <Icon stroke={match(link)(pathname) ? COLORS.blue : COLORS.white} size={24} />
                </Link>
            ))}
        </div>
    );
}
