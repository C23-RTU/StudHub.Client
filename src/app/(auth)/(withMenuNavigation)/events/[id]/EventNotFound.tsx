import { BackButton } from '@/components/ui/BackButton';

export default function EventNotFound() {
    return (
        <main className="flex h-[95svh] w-full flex-col items-center justify-center gap-2">
            <p className="text-9xl font-bold">404</p>
            <p className="text-2xl font-bold">Событие не найдено</p>
            <BackButton />
        </main>
    );
}
