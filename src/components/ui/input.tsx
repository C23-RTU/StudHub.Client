'use client';

import { Eye, EyeClosed } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

import { cn } from '@/lib/utils/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
    ({ className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="relative">
                <input
                    type={showPassword ? 'text' : type}
                    className={cn(
                        'file:text-foreground w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm transition duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 placeholder:select-none focus:ring-1 focus:ring-neutral-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {type === 'password' && (
                    <div className="absolute top-1/2 right-2 -translate-y-1/2 pl-2">
                        {showPassword ? (
                            <Eye className="cursor-pointer" size={20} onClick={() => setShowPassword(!showPassword)} />
                        ) : (
                            <EyeClosed
                                className="cursor-pointer"
                                size={20}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
