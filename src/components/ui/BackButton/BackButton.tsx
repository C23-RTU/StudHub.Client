'use client';

import type { VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

import { Button } from '../button';

import { cn } from '@/lib/utils/utils';

type BackButtonProps = {
    onClick?: () => void;
    variant?: VariantProps<typeof Button>['variant'];
    className?: string;
};

export function BackButton({ onClick, variant = 'default', className = '' }: BackButtonProps) {
    const router = useRouter();
    return (
        <Button
            className={cn('text-text m-0 flex items-center justify-center rounded-lg hover:cursor-pointer', className)}
            size={'icon'}
            variant={variant}
            onClick={onClick ? onClick : () => router.back()}
        >
            <FaArrowLeft />
        </Button>
    );
}
