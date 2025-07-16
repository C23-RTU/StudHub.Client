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
                        'flex h-10 w-full bg-secondary rounded-md transition duration-300 border border-neutral-700 px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-500 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-600 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:select-none',
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {type === 'password' && (
                    <div className="bg-secondary absolute top-1/2 right-2 pl-2 -translate-y-1/2">
                        {showPassword ? (
                            <Eye
                                className="bg-secondary cursor-pointer"
                                size={20}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <EyeClosed
                                className="bg-secondary cursor-pointer"
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
