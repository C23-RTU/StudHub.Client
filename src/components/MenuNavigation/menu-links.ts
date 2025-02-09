import { Home, Search, User, Zap } from 'lucide-react';

import { AUTH_PAGE } from '@/lib/config/routes.config';

export const MENU_LINKS = [
    {
        Icon: Home,
        link: AUTH_PAGE.HOME,
    },
    {
        Icon: Zap,
        link: AUTH_PAGE.EVENTS,
    },
    {
        Icon: Search,
        link: AUTH_PAGE.CLUBS,
    },
    {
        Icon: User,
        link: AUTH_PAGE.PROFILE,
    },
];
