import type { Metadata } from 'next';
import { Geologica, Inter, Unbounded } from 'next/font/google';

import ProviderLayout from '@/components/Provider/Provider';

import '@/scss/globals.scss';

const geologica = Geologica({
    subsets: ['latin'],
    variable: '--font-geologica',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded' });

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
        <html lang="en" className=''>
            <body
                className={`${inter.variable} ${geologica.variable} ${unbounded.variable} antialiased dark font-inter max-w-[1024px] w-full mx-auto`}
            >
                <ProviderLayout>{children}</ProviderLayout>
            </body>
        </html>
    );
}
