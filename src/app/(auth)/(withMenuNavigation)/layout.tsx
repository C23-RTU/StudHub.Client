import type { PropsWithChildren } from 'react';

import { MenuNavigation } from '@/components/MenuNavigation/MenuNavigation';

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <main className="flex w-full flex-row">
            <div className="mb-[theme(height.menuNavigation)] mx-auto w-full max-w-[600px]">
                {children}
                <MenuNavigation />
            </div>
        </main>
    );
}
