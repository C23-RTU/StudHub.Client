import type { Metadata } from 'next';

import About from './About';

export const metadata: Metadata = {
    title: 'О приложении',
};

export default function AboutPage() {
    return <About />;
}
