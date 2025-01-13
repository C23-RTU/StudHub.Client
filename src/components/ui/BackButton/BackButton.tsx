'use client';

import { Undo2 } from 'lucide-react';

interface BackButtonProps {
    onClick?: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
    return (
        <a
            className="rounded-lg w-10 h-10 bg-secondary flex justify-center items-center hover:cursor-pointer"
            onClick={onClick}
        >
            <Undo2 />
        </a>
    );
}
