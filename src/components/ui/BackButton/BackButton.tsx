'use client';

import type { VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

import { Button } from '../button';

type BackButtonProps = {
    onClick?: () => void;
    variant?: VariantProps<typeof Button>['variant'];
};

export function BackButton({ onClick, variant = 'default' }: BackButtonProps) {
    const router = useRouter();
    return (
        <Button
            className="m-0 flex items-center justify-center rounded-lg hover:cursor-pointer"
            size={'icon'}
            variant={variant}
            onClick={onClick ? onClick : () => router.back()}
        >
            <FaArrowLeft />
        </Button>
    );
}
