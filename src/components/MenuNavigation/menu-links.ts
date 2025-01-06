import { CalendarClockIcon, CircleUserIcon, CompassIcon, HouseIcon, UsersIcon } from 'lucide-react';

import { AUTH_PAGE } from '@/lib/config/routes.config';

export const MENU_LINKS = [
    {
        Icon: HouseIcon,
        link: AUTH_PAGE.HOME,
    },
    {
        Icon: CompassIcon,
        link: AUTH_PAGE.EVENTS,
    },
    {
        Icon: CalendarClockIcon,
        link: AUTH_PAGE.CALENDAR,
    },
    {
        Icon: UsersIcon,
        link: AUTH_PAGE.CLUBS,
    },
    {
        Icon: CircleUserIcon,
        link: AUTH_PAGE.PROFILE,
    },
];
