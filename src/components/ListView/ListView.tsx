export default function ListView({ children, className }: { children: React.ReactNode; className?: string }) {
    return <section className={`flex flex-col gap-6 ${className}`}>{children}</section>;
}
