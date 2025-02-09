import type { Metadata } from 'next';
import { Geologica, Syncopate, Inter } from 'next/font/google';

import ProviderLayout from '@/components/Provider/Provider';

import '@/scss/globals.scss';

const geologica = Geologica({
    subsets: ['latin'],
    variable: '--font-geologica',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const syncopate = Syncopate({ subsets: ['latin'], variable: '--font-syncopate', weight: ['700'] });

export const metadata: Metadata = {
    title: {
        absolute: 'Сетка РТУ МИРЭА',
        template: `%s | Сетка РТУ МИРЭА`,
    },
    description: 'Сетка РТУ МИРЭА',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${geologica.variable} ${syncopate.variable} antialiased dark font-geologica max-w-[1024px] mx-auto`}
            >
                <ProviderLayout>{children}</ProviderLayout>
            </body>
        </html>
    );
}
