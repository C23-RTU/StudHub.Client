import { SearchIcon } from 'lucide-react';
import React, { type ComponentProps } from 'react';

import { Input } from '../input';

type Props = ComponentProps<typeof Input>;

export function SearchInput(props: Props) {
    return (
        <div className="relative z-0">
            <Input {...props} className="pr-8" onChange={props.onChange} />
            <div
                className="absolute right-2 top-[50%] translate-y-[-50%] flex items-center justify-center cursor-pointer active:scale-90 transition-all select-none"
                onClick={props.onClick}
            >
                <SearchIcon size={21} />
            </div>
        </div>
    );
}
