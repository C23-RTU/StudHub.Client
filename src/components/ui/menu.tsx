import Image from 'next/image';
import Link from 'next/link';
import type { IconType } from 'react-icons/lib';
import { LuCheck, LuChevronRight } from 'react-icons/lu';

import { cn } from '@/lib/utils/utils';

type MenuProps = {
    className?: string;
    children: React.ReactNode;
};

function Menu({ className = '', children }: MenuProps) {
    return (
        <ul className={cn('border-border bg-background-light flex flex-col rounded-md border', className)}>
            {children}
        </ul>
    );
}

type MenuLinkProps = {
    className?: string;
    title: string;
    hideChevron?: boolean;
    href: string;
} & (
    | {
          Icon: IconType;
          imageSrc?: never;
          imageAlt?: never;
      }
    | {
          Icon?: never;
          imageSrc: string;
          imageAlt: string;
      }
);

function MenuLink({ className = '', title, hideChevron = false, Icon, href, imageAlt, imageSrc }: MenuLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                'hover:bg-background-dimmed/50 flex flex-row items-center gap-4 border-b border-neutral-300 px-4 py-3 text-neutral-800 transition-colors duration-150 select-none first:rounded-t-md last:rounded-b-md last:border-none dark:border-neutral-800 dark:text-neutral-200',
                className
            )}
        >
            {Icon ? (
                <Icon size={20} />
            ) : (
                <div className="relative h-5 w-5 shrink-0">
                    <Image src={imageSrc!} alt={imageAlt!} fill sizes="20px" className="rounded-full object-contain" />
                </div>
            )}
            <p className="text-neutral-700 dark:text-neutral-300">{title}</p>
            {!hideChevron && <LuChevronRight size={20} className="ml-auto" />}
        </Link>
    );
}

type MenuItemProps = {
    className?: string;
    title: string;
    hideChevron?: boolean;
    onClick?: () => void;
} & (
    | {
          Icon: IconType;
          imageSrc?: never;
          imageAlt?: never;
      }
    | {
          Icon?: never;
          imageSrc: string;
          imageAlt: string;
      }
);

function MenuItem({
    className = '',
    title,
    hideChevron = false,
    Icon,
    imageAlt,
    imageSrc,
    onClick = () => {},
}: MenuItemProps) {
    return (
        <div
            className={cn(
                'hover:bg-background-dimmed/50 flex cursor-pointer flex-row items-center gap-4 border-b border-neutral-300 px-4 py-3 text-neutral-800 transition-colors duration-150 select-none first:rounded-t-md last:rounded-b-md last:border-none dark:border-neutral-800 dark:text-neutral-200',
                className
            )}
            onClick={onClick}
        >
            {Icon ? (
                <Icon size={20} />
            ) : (
                <div className="relative h-5 w-5 shrink-0">
                    <Image src={imageSrc!} alt={imageAlt!} fill sizes="20px" className="rounded-full object-contain" />
                </div>
            )}
            <p className="text-neutral-700 dark:text-neutral-300">{title}</p>
            {!hideChevron && <LuChevronRight size={20} className="ml-auto" />}
        </div>
    );
}

type MenuRadioProps = {
    className?: string;
    title: string;
    selected?: boolean;
    onClick?: () => void;
} & (
    | {
          Icon: IconType;
          imageSrc?: never;
          imageAlt?: never;
      }
    | {
          Icon?: never;
          imageSrc: string;
          imageAlt: string;
      }
);

function MenuRadio({
    className = '',
    title,
    selected = false,
    Icon,
    imageAlt,
    imageSrc,
    onClick = () => {},
}: MenuRadioProps) {
    return (
        <div
            className={cn(
                'hover:bg-background-dimmed/50 flex cursor-pointer flex-row items-center gap-4 border-b border-neutral-300 px-4 py-3 text-neutral-800 transition-colors duration-150 select-none first:rounded-t-md last:rounded-b-md last:border-none dark:border-neutral-800 dark:text-neutral-200',
                className
            )}
            onClick={onClick}
        >
            {Icon ? (
                <Icon size={20} />
            ) : (
                <div className="relative h-5 w-5 shrink-0">
                    <Image src={imageSrc!} alt={imageAlt!} fill sizes="20px" className="rounded-full object-contain" />
                </div>
            )}
            <p className="text-neutral-700 dark:text-neutral-300">{title}</p>
            {selected && <LuCheck size={20} className="ml-auto" />}
        </div>
    );
}

export { Menu, MenuLink, MenuItem, MenuRadio };
