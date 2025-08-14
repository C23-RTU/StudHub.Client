import type { PropsWithChildren } from 'react';

import { MenuNavigation } from '@/components/MenuNavigation/MenuNavigation';

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <main className="mb-[theme(height.menuNavigation)] mx-auto w-full">
            {children}
            <MenuNavigation />
        </main>
    );
}
