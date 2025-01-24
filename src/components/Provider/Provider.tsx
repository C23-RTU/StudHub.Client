'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domAnimation } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import { queryClient } from './getQueryClient';

export default function ProviderLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <LazyMotion features={domAnimation}>{children}</LazyMotion>
            </QueryClientProvider>
            <Toaster position="top-center" />
        </>
    );
}
