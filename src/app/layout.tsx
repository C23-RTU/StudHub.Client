import type { Metadata } from 'next';
import { Geologica } from 'next/font/google';
import { Inter } from 'next/font/google';

import ProviderLayout from '@/components/Provider/Provider';

import '@/scss/globals.scss';

const geologica = Geologica({
    subsets: ['latin'],
    variable: '--font-geologica',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
            <body className={`${inter.variable} ${geologica.variable} antialiased dark font-geologica`}>
                <ProviderLayout>{children}</ProviderLayout>
            </body>
        </html>
    );
}
