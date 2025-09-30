import Loader from './Loader';

export function MainLoader() {
    return (
        <div className="max-w-content border-border flex h-[98svh] w-full items-center justify-center border-x">
            <figure className="flex flex-col items-center justify-center gap-2">
                <Loader />
                <small className="text-muted text-xs">Загрузка</small>
            </figure>
        </div>
    );
}
