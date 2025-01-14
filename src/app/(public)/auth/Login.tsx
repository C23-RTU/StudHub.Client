'use client';

import { Eye, EyeClosed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { AUTH_PAGE } from '@/lib/config/routes.config';

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        // Тут уже работаем с апишкой
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input placeholder="Почта" type="email" />
            <div className="relative">
                <Input name="password" placeholder="Пароль" type={showPassword ? 'text' : 'password'} />
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
            </div>
            <Button type="submit" onClick={() => router.push(AUTH_PAGE.HOME)}>
                Войти
            </Button>
        </form>
    );
}
