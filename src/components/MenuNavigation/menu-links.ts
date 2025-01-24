import { GoHomeFill } from 'react-icons/go';
import { FaCompass, FaGlobe, FaUser } from 'react-icons/fa';

import { AUTH_PAGE } from '@/lib/config/routes.config';

export const MENU_LINKS = [
    {
        Icon: GoHomeFill,
        link: AUTH_PAGE.HOME,
    },
    {
        Icon: FaCompass,
        link: AUTH_PAGE.EVENTS,
    },
    {
        Icon: FaGlobe,
        link: AUTH_PAGE.CLUBS,
    },
    {
        Icon: FaUser,
        link: AUTH_PAGE.PROFILE,
    },
];
