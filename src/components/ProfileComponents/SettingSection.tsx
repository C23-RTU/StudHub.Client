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
            className="flex flex-row items-center gap-4 border-b border-neutral-300 px-4 py-3 text-neutral-800 select-none last:border-none dark:border-neutral-800 dark:text-neutral-200"
        >
            <Icon size={20} />
            <p className="text-neutral-700 dark:text-neutral-300">{title}</p>
            {!hideChevron && !hideChevron && <ChevronRightIcon size={20} className="ml-auto" />}
        </Link>
    );
}

export default SettingsSection;
