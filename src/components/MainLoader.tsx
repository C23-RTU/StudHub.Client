import Loader from './Loader';

export function MainLoader() {
    return (
        <div className="max-w-page flex h-[98svh] items-center justify-center">
            <figure className="flex flex-col items-center justify-center gap-2">
                <Loader />
                <small className="text-xs text-neutral-500">Загрузка</small>
            </figure>
        </div>
    );
}
