import { LoaderIcon } from 'lucide-react';

export function MainLoader() {
    return (
        <div className="h-[calc(100svh-theme(height.menuNavigation))] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
                <LoaderIcon className="animate-spin" size={30} />
                <small className="text-gray-300 text-xs">Загрузка</small>
            </div>
        </div>
    );
}
