'use client';

import { Header, HeaderTitle } from '@/components/Header/Header';
import { NotificationBadge } from '@/components/NotificationBadge/NotificationBadge';

export function Profile() {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>Профиль</HeaderTitle>
                <NotificationBadge />
            </Header>
        </div>
    );
}
