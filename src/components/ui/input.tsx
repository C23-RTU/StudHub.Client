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
                        'flex h-10 w-full rounded bg-secondary rounded-t-md rounded-b-none border-b transition duration-300 focus:border-b-2 focus:border-b-neutral-200 border-neutral-600 placeholder-neutral-800 px-3 py-2 text-sm ring-0 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-600 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:select-none',
                        className,
                    )}
                    ref={ref}
                    {...props}
                />

                {type === 'password' && (
                    <>
                        {showPassword ? (
                            <Eye
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                                size={20}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <EyeClosed
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                                size={20}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </>
                )}
            </div>
        );
    },
);
Input.displayName = 'Input';

export { Input };
