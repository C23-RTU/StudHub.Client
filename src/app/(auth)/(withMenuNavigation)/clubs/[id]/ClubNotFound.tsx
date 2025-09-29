import Link from 'next/link';
import { MdOutlineWifiTetheringError } from 'react-icons/md';

import { Button } from '@/components/ui/button';

export default function ClubNotFound() {
    return (
        <main className="border-border max-w-content flex h-screen w-full flex-col items-center justify-center gap-4 border-x">
            <MdOutlineWifiTetheringError size={86} />

            <div className={'max-w-sm text-center'}>
                <p className="text-text text-lg font-bold">Клуб не найден</p>
                <p className="text-muted text-sm">
                    Проверьте, что ID клуба в адресе указан верно. В другом случае, его могло и не существовать.
                </p>
            </div>

            <Link href={'/'} className={'mt-2'}>
                <Button variant={'outline'}>Вернуться на главную</Button>
            </Link>
        </main>
    );
}
