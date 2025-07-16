import type { Metadata } from 'next';
import { Geologica, Inter, Unbounded } from 'next/font/google';

import ProviderLayout from '@/components/Provider/Provider';

import '@/css/globals.css';

const geologica = Geologica({
    subsets: ['latin'],
    variable: '--font-geologica',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded' });

export const metadata: Metadata = {
    title: {
        absolute: 'СтудХаб РТУ МИРЭА',
        template: `%s | СтудХаб РТУ МИРЭА`,
    },
    description: 'СтудХаб РТУ МИРЭА',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="">
            <body
                className={`${inter.variable} ${geologica.variable} ${unbounded.variable} antialiased dark font-inter`}
            >
                <ProviderLayout>{children}</ProviderLayout>
            </body>
        </html>
    );
}
