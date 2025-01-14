'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domAnimation } from 'framer-motion';
import type { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default function ProviderLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <QueryClientProvider client={queryClient}>
            <LazyMotion features={domAnimation}>{children}</LazyMotion>
        </QueryClientProvider>
    );
}
