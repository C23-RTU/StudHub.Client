'use client';

import { motion } from 'framer-motion';

import Loader from './Loader';

export function MainLoader() {
    return (
        <div className="max-w-content border-border flex h-[98svh] w-full items-center justify-center border-x">
            <figure className="flex flex-col items-center justify-center gap-2">
                <Loader />
                <motion.small
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5, ease: 'easeOut' }}
                    className="text-muted text-xs"
                >
                    Загрузка
                </motion.small>
            </figure>
        </div>
    );
}
