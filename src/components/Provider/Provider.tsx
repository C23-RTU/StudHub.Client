'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import { queryClient } from './getQueryClient';

export default function ProviderLayout({ children }: PropsWithChildren) {
    return (
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
            <QueryClientProvider client={queryClient}>
                <LazyMotion features={domAnimation}>{children}</LazyMotion>
            </QueryClientProvider>
            <Toaster
                position="bottom-center"
                containerStyle={{ marginBottom: '42px' }}
                toastOptions={{
                    className: 'bg-background text-text',
                    duration: 2000,
                    removeDelay: 500,
                }}
            />
        </ThemeProvider>
    );
}
