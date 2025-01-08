'use client';

import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegistrationForm() {
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = {
            name: (event.currentTarget.elements.namedItem('name') as HTMLFormElement).value,
            surname: (event.currentTarget.elements.namedItem('surname') as HTMLFormElement).value,
            email: (event.currentTarget.elements.namedItem('email') as HTMLFormElement).value,
            password: (event.currentTarget.elements.namedItem('password') as HTMLFormElement).value,
            confirmPassword: (event.currentTarget.elements.namedItem('confirmPassword') as HTMLFormElement).value,
        };

        if (data.password !== data.confirmPassword) {
            alert('Пароли не совпадают!');
        }

        // api
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input name="name" placeholder="Имя" type="text" required />
            <Input name="surname" placeholder="Фамилия" type="text" required />
            <Input name="email" placeholder="Почта" type="email" required />
            <div className="relative">
                <Input name="password" placeholder="Пароль" type={showPassword ? 'text' : 'password'} required />
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
            <Input name="confirmPassword" placeholder="Повторите пароль" type={showPassword ? 'text' : 'password'} />
            <Button type="submit">Зарегистрироваться</Button>
        </form>
    );
}
