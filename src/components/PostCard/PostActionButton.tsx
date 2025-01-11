'use client';

import { useMemo, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { MdOutlineModeComment } from 'react-icons/md';

interface Props {
    type: 'like' | 'comment';
    initialValue: number;
}

const ICON_SIZE = 21;

export function PostActionButton({ type, initialValue }: Props) {
    const [status, setStatus] = useState<boolean>(false);
    const [value, setValue] = useState<number>(initialValue);

    async function handleClick() {
        if (type === 'like') {
            setStatus(!status);
            setValue(status ? value - 1 : value + 1);
        }
        return;
    }

    const computedIcon = useMemo(() => {
        switch (type) {
            case 'like':
                return status ? <IoMdHeart size={ICON_SIZE} /> : <IoMdHeartEmpty size={ICON_SIZE} />;
            case 'comment':
                return <MdOutlineModeComment size={ICON_SIZE} />;
        }
    }, [type, status]);

    return (
        <div className="flex items-center gap-2" onClick={handleClick}>
            {computedIcon}
            <p className="text-xs">{value}</p>
        </div>
    );
}
