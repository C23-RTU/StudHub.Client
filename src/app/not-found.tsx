import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default async function NotFound() {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-2">
            <p className="text-9xl font-bold">404</p>
            <p className="text-2xl font-bold">Страница не найдена</p>
            <Link href={'/'}>
                <Button>Вернуться на главную</Button>
            </Link>
        </main>
    );
}
