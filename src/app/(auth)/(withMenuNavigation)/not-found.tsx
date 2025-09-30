import Link from 'next/link';
import { MdOutlineWifiTetheringError } from 'react-icons/md';

import { Button } from '@/components/ui/button';

export default async function NotFound() {
    return (
        <main className="border-border max-w-content flex h-screen w-full flex-col items-center justify-center gap-6 border-x">
            <MdOutlineWifiTetheringError size={86} />

            <div className={'max-w-sm text-center'}>
                <p className="text-lg font-bold">Страница не найдена</p>
                <p className="text-muted text-sm">
                    Страница которую вы искали к сожаления не найдена. Проверьте правильность адреса.
                </p>
            </div>

            <Link href={'/'}>
                <Button variant={'outline'}>Вернуться на главную</Button>
            </Link>
        </main>
    );
}
