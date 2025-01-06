import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ваш профиль',
    description: '',
};

export default function Page() {
    return <div className="page">Профиль</div>;
}
