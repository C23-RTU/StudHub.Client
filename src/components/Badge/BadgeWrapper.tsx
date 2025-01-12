import type { HTMLAttributes, PropsWithChildren } from 'react';

type TBadgeWrapper = PropsWithChildren & HTMLAttributes<HTMLDivElement>;

export function BadgeWrapper({ children, ...props }: TBadgeWrapper) {
    return (
        <div className="cursor-pointer active:bg-secondary transition-colors rounded-full p-2 relative" {...props}>
            {children}
        </div>
    );
}
