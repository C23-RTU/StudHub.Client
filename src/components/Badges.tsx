import type { HTMLAttributes, PropsWithChildren } from 'react';
import { IoCalendar, IoSettingsSharp } from 'react-icons/io5';

type TBadgeWrapper = PropsWithChildren & HTMLAttributes<HTMLDivElement>;

function BadgeWrapper({ children, ...props }: TBadgeWrapper) {
    return (
        <div className="active:bg-secondary relative cursor-pointer rounded-full p-2 transition-colors" {...props}>
            {children}
        </div>
    );
}

function SettingBadge({ ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <BadgeWrapper {...props}>
            <IoSettingsSharp size={28} />
        </BadgeWrapper>
    );
}

function CalendarBadge({ ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <BadgeWrapper {...props}>
            <IoCalendar size={28} />
        </BadgeWrapper>
    );
}

export { SettingBadge, BadgeWrapper, CalendarBadge };
