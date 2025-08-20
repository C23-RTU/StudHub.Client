import { BiBell, BiExit } from 'react-icons/bi';
import { FaGraduationCap, FaPortrait } from 'react-icons/fa';
import { IoMailOpen } from 'react-icons/io5';
import { RiPaintFill } from 'react-icons/ri';

import { AUTH_PAGE } from '@/lib/config/routes.config';

export const PROFILE_SETTING_SECTIONS = {
    sections: [
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/edit`,
            title: 'Изменить профиль',
            Icon: FaPortrait,
        },
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/appearance`,
            title: 'Внешний вид',
            Icon: RiPaintFill,
        },
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/notifications`,
            title: 'Уведомления',
            Icon: BiBell,
        },
    ],
    other: [
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/notifications`,
            title: 'Выйти из аккаунта',
            Icon: BiExit,
        },

        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/about`,
            title: 'О приложении',
            Icon: FaGraduationCap,
        },
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/notifications`,
            title: 'Сообщить об ошибке',
            Icon: IoMailOpen,
        },
    ],
};
