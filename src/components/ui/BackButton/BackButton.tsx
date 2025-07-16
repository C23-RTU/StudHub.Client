'use client';

import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '../button';

interface BackButtonProps {
    onClick?: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
    const router = useRouter();
    return (
        <Button
            className="rounded-lg w-10 h-10 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] bg-secondary flex justify-center items-center hover:cursor-pointer"
            onClick={onClick ? onClick : () => router.back()}
            variant={'outline'}
        >
            <Undo2 />
        </Button>
    );
}
