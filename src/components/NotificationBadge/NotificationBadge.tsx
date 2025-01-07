import { BellIcon } from 'lucide-react';

export function NotificationBadge() {
    return (
        <div className="cursor-pointer active:bg-secondary transition-colors rounded-full p-2 relative">
            <BellIcon size={28} />
            <span className="text-[8px] px-1 py-[0.1rem] rounded-full bg-blue absolute leading-none bottom-[6px] right-[5px] select-none">
                1
            </span>
        </div>
    );
}
