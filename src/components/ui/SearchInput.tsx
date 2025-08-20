import { SearchIcon } from 'lucide-react';
import React, { type ComponentProps } from 'react';

import { Input } from './input';

type Props = ComponentProps<typeof Input>;

export function SearchInput(props: Props) {
    return (
        <div className="relative w-full">
            <Input {...props} className="w-full max-w-screen pr-8" onChange={props.onChange} />
            <div
                className="absolute top-[50%] right-2 flex translate-y-[-50%] cursor-pointer items-center justify-center transition-all select-none active:scale-90"
                onClick={props.onClick}
            >
                <SearchIcon size={21} />
            </div>
        </div>
    );
}
