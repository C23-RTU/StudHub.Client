import React, { type ComponentProps } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '../input';

type Props = ComponentProps<typeof Input>;

interface IFormField extends Omit<Props, 'onCopy' | 'onChange' | 'onFocus' | 'onBlur'> {
    error?: string;
    registration: UseFormRegisterReturn;
    textAreaProps?: {
        rows?: number;
        maxLength?: number;
    };
}

export function FormTextArea({ error, registration, placeholder, textAreaProps }: IFormField) {
    const [textAreaValue, setTextAreaValue] = React.useState('');
    const maxLength = textAreaProps?.maxLength || 200;

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(e.target.value);
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="relative w-full">
                <textarea
                    {...registration}
                    placeholder={placeholder}
                    rows={textAreaProps?.rows || 4}
                    maxLength={maxLength}
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                    className="w-full placeholder:text-neutral-600 rounded-lg bg-secondary border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-600 border-neutral-700"
                />
                <span className="absolute bottom-2 right-4 text-xs text-neutral-600">
                    {textAreaValue.length}/{maxLength}
                </span>
            </div>

            {error && <p className="text-red-500 text-xss">{error}</p>}
        </div>
    );
}
