import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type SettingsClubProps = {
    href: string;
    title: string;
    imageUrl: string;
};

function SettingsClubSection({ href, title, imageUrl }: SettingsClubProps) {
    return (
        <Link
            href={href}
            className="flex flex-row items-center gap-4 border-b border-neutral-300 px-4 py-3 text-neutral-800 select-none last:border-none dark:border-neutral-800 dark:text-neutral-200"
        >
            <Image src={imageUrl} alt="Аватарка клуба" width={128} height={128} className="size-[20px] rounded-full" />
            <p className="text-neutral-700 dark:text-neutral-300">{title}</p>
            <ChevronRightIcon size={20} className="ml-auto" />
        </Link>
    );
}

export default SettingsClubSection;
