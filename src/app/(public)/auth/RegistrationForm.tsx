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
            name: (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
            surname: (event.currentTarget.elements.namedItem('lastname') as HTMLInputElement).value,
            middlename: (event.currentTarget.elements.namedItem('middlename') as HTMLInputElement)?.value || '',
            age: parseInt((event.currentTarget.elements.namedItem('age') as HTMLInputElement).value) || null,
            about: (event.currentTarget.elements.namedItem('about') as HTMLInputElement)?.value || '',
            email: (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
            password: (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value,
            confirmPassword: (event.currentTarget.elements.namedItem('confirmPassword') as HTMLInputElement).value,
        };        

        if (data.password !== data.confirmPassword) {
            alert('Пароли не совпадают!');
        }

        // api
    }

    return (
        <form className="flex flex-col gap-4 grid-cols-2" onSubmit={handleSubmit}>
            <Input name="name" placeholder="Имя" type="text" required />
            <Input name="lastname" placeholder="Фамилия" type="text" required />
            <Input name="middlename" placeholder="Отчество" type="text" />
            <Input name="age" placeholder="Возраст" type="integer" required />
            <Input name="about" placeholder="Номер института" type="integer" />
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
