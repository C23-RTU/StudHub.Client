import type { Metadata } from 'next';
import { Geologica, Inter, Montserrat, Unbounded } from 'next/font/google';

import ProviderLayout from '@/components/Provider/Provider';

import '@/css/globals.css';

const geologica = Geologica({
    subsets: ['latin'],
    variable: '--font-geologica',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded' });

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
});

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
                className={`${inter.variable} ${geologica.variable} ${unbounded.variable} ${montserrat.variable} font-inter bg-neutral-50 text-neutral-950 antialiased dark:bg-neutral-950 dark:text-neutral-50`}
            >
                <ProviderLayout>{children}</ProviderLayout>
            </body>
        </html>
    );
}
