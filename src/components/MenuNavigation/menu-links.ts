import { RiHome2Line } from 'react-icons/ri';
import { FaRegCompass } from "react-icons/fa6";
import { BiGlobe } from "react-icons/bi";
import { LuUserRound } from "react-icons/lu";

import { AUTH_PAGE } from '@/lib/config/routes.config';

export const MENU_LINKS = [
    {
        Icon: RiHome2Line,
        link: AUTH_PAGE.HOME,
    },
    {
        Icon: FaRegCompass,
        link: AUTH_PAGE.EVENTS,
    },
    {
        Icon: BiGlobe,
        link: AUTH_PAGE.CLUBS,
    },
    {
        Icon: LuUserRound,
        link: AUTH_PAGE.PROFILE,
    },
];
