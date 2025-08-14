import { BiBell, BiDoorOpen, BiExit } from 'react-icons/bi';
import { FaPortrait } from 'react-icons/fa';
import { IoMailOpen } from 'react-icons/io5';
import { LuBell, LuDoorOpen, LuMail, LuUserPen } from 'react-icons/lu';

import { AUTH_PAGE } from '@/lib/config/routes.config';

export const PROFILE_SETTING_SECTIONS = {
    sections: [
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/edit`,
            title: 'Изменить профиль',
            Icon: FaPortrait,
        },
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/notifications`,
            title: 'Уведомления',
            Icon: BiBell,
        },
    ],
    clubs: [
        {
            href: AUTH_PAGE.PROFILE_SETTINGS,
            title: 'Клуб 1',
            imageUrl:
                'https://gravatar.com/avatar/d99cc6ace66fc8bd197c30c876b7224007211f4572ef6d8444693f67b4c33ab1?size=256',
        },
        {
            href: AUTH_PAGE.PROFILE_SETTINGS,
            title: 'Клуб 2',
            imageUrl:
                'https://gravatar.com/avatar/d99cc6ace66fc8bd197c30c876b7224007211f4572ef6d8444693f67b4c33ab1?size=256',
        },
    ],
    other: [
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/notifications`,
            title: 'Выйти из аккаунта',
            Icon: BiExit,
        },
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/notifications`,
            title: 'Сообщить об ошибке',
            Icon: IoMailOpen,
        },
    ],
};
