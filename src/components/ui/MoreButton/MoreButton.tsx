'use client';

import { motion as m } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';

interface MoreButtonProps {
    onClick?: () => void;
}

export function MoreButton({ onClick }: MoreButtonProps) {
    return (
        <m.a
            className="rounded-lg w-7 h-10 bg-secondary flex justify-center items-center hover:cursor-pointer"
            onClick={onClick}
            layoutId="more"
        >
            <EllipsisVertical />
        </m.a>
    );
}
