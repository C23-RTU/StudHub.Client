import type { PropsWithChildren } from 'react';

import { MenuNavigation } from '@/components/MenuNavigation/MenuNavigation';

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="mb-[theme(height.menuNavigation)] max-w-[1024px] mx-auto">
            {children}
            <MenuNavigation />
        </div>
    );
}
