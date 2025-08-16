import { Search, Zap } from 'lucide-react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiHome9Line } from 'react-icons/ri';

import { AUTH_PAGE } from '@/lib/config/routes.config';

export const MENU_LINKS = [
    {
        Icon: RiHome9Line,
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
        Icon: AiOutlineUser,
        link: AUTH_PAGE.PROFILE,
    },
];
