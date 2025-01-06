import type { PropsWithChildren } from 'react';

import { MenuNavigation } from '@/components/MenuNavigation/MenuNavigation';

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="h-[calc(100svh-theme(height.menuNavigation))]">
            {children}
            <MenuNavigation />
        </div>
    );
}
