import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return <div className="h-full">{children}</div>;
}
