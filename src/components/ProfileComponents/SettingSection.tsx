import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import type { IconType } from 'react-icons/lib';

type SettingsSectionProps = {
    href: string;
    title: string;
    Icon: IconType;
    hideChevron?: boolean;
};

function SettingsSection({ href, title, Icon, hideChevron }: SettingsSectionProps) {
    return (
        <Link
            href={href}
            className="flex flex-row items-center gap-4 border-b border-neutral-800 px-4 py-3 text-neutral-200 select-none last:border-none"
        >
            <Icon size={20} />
            <p className="text-neutral-300">{title}</p>
            {!hideChevron && !hideChevron && <ChevronRightIcon size={20} className="ml-auto" />}
        </Link>
    );
}

export default SettingsSection;
