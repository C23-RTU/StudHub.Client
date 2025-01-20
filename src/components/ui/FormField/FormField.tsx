import type { ComponentProps } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '../input';

type Props = ComponentProps<typeof Input>;

interface IFormField extends Props {
    error?: string;
    registration: UseFormRegisterReturn;
}

export function FormField({ error, registration, ...props }: IFormField) {
    return (
        <div className="flex flex-col gap-1">
            <Input {...props} {...registration} />

            {error && <p className="text-red-500 text-xss">{error}</p>}
        </div>
    );
}
