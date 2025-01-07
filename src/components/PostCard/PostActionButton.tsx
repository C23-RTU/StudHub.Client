import { HeartIcon, MessageSquareIcon } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
    type: 'like' | 'comment';
    value: string | number;
}

const ICON_SIZE = 21;

export function PostActionButton({ type, value }: Props) {
    const computedIcon = useMemo(() => {
        switch (type) {
            case 'like':
                return <HeartIcon size={ICON_SIZE} />;
            case 'comment':
                return <MessageSquareIcon size={ICON_SIZE} />;
        }
    }, [type]);

    return (
        <div className="flex items-center gap-2">
            {computedIcon}
            <p className="text-xs">{value}</p>
        </div>
    );
}
