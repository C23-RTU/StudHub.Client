import { LoaderCircle } from 'lucide-react';

export function MainLoader() {
    return (
        <div className="flex h-[98svh] items-center justify-center">
            <figure className="flex flex-col items-center justify-center gap-2">
                <LoaderCircle className="animate-spin" size={30} />
                <small className="text-xs text-gray-300">Загрузка</small>
            </figure>
        </div>
    );
}
