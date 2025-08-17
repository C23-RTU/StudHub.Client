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
        absolute: 'СтудХаб',
        template: `%s | СтудХаб`,
    },
    description: 'Твоя студенческая жизнь в РТУ МИРЭА —  все события и новости в одной сети.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="">
            <body
                className={`${inter.variable} ${geologica.variable} ${unbounded.variable} font-inter bg-background-light text-text antialiased`}
            >
                <ProviderLayout>{children}</ProviderLayout>
            </body>
        </html>
    );
}
