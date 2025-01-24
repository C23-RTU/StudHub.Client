import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return <div className="max-w-[1024px] mx-auto">{children}</div>;
}
