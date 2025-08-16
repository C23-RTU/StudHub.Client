import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils/utils';

type Props = {
    className?: string;
};

export default function Loader({ className = '' }: Props) {
    return <LoaderCircle className={cn('text-text size-8 animate-spin', className)} />;
}
