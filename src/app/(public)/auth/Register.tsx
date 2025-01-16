'use client';

import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { registerSchema } from '@/schemas/registerSchema';
import type { registerData } from '@/schemas/registerSchema';

interface RegisterProps {
    onRegister: (data: registerData) => void;
}

export default function Register({ onRegister }: RegisterProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedInstitute, setSelectedInstitute] = useState<string | null>(null);
    const [aboutText, setAboutText] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 200) {
            setAboutText(event.target.value);
        }
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data = {
            firstName: formData.get('name') as string,
            lastName: formData.get('lastname') as string,
            middleName: (formData.get('middlename') as string) || '',
            age: parseInt(formData.get('age') as string, 10),
            institute: selectedInstitute || null,
            email: formData.get('email') as string,
            about: aboutText || '',
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        };

        try {
            registerSchema.parse(data);
            setErrors({});

            onRegister(data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0].toString()] = err.message;
                    }
                });
                setErrors(fieldErrors);
            }
        }
    }

    return (
        <form className="grid gap-5 grid-cols-3" onSubmit={handleSubmit}>
            <div className="relative">
                <Input name="name" placeholder="Имя" type="text" />
                {errors.firstName && (
                    <p className="text-red-500 text-xs absolute left-0 bottom-full">{errors.firstName}</p>
                )}
            </div>
            <div className="relative">
                <Input name="lastname" placeholder="Фамилия" type="text" />
                {errors.lastName && (
                    <p className="text-red-500 text-xs absolute left-0 bottom-full">{errors.lastName}</p>
                )}
            </div>
            <div className="relative">
                <Input name="middlename" placeholder="Отчество" type="text" />
                {errors.middleName && (
                    <p className="text-red-500 text-xs absolute left-0 bottom-full">{errors.middleName}</p>
                )}
            </div>
            <div className="col-span-3 relative">
                <Input name="email" placeholder="Почта" type="email" />
                {errors.email && <p className="text-red-500 text-xs absolute left-0 bottom-full">{errors.email}</p>}
            </div>
            <div className="grid gap-4 grid-cols-2 col-span-3">
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
                    {errors.password && (
                        <p className="text-red-500 text-xs absolute left-0 bottom-full">{errors.password}</p>
                    )}
                </div>
                <div className="relative">
                    <Input
                        name="confirmPassword"
                        placeholder="Повторите пароль"
                        type={showPassword ? 'text' : 'password'}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs absolute left-0 bottom-full">{errors.confirmPassword}</p>
                    )}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="w-full bg-secondary hover:bg-secondary/80 rounded-b-none border-b focus:border-b-2 focus:border-b-neutral-200 border-neutral-600">
                            {selectedInstitute || 'Выберите институт'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Выберите институт</DropdownMenuLabel>
                        {['КБ-1', 'КБ-2', 'КБ-3'].map((institute) => (
                            <DropdownMenuItem key={institute} onClick={() => setSelectedInstitute(institute)}>
                                {institute}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative">
                    <Input name="age" placeholder="Возраст" type="number" />
                    {errors.age && <p className="text-red-500 text-xs absolute left-0 bottom-full">{errors.age}</p>}
                </div>
            </div>

            <div className="col-span-3">
                <div className="relative w-full">
                    <textarea
                        name="about"
                        placeholder="Расскажите о себе"
                        value={aboutText}
                        onChange={handleTextChange}
                        rows={6}
                        className="w-full placeholder:text-neutral-600 rounded-lg bg-secondary border px-4 py-2 text-sm focus:outline-none focus:border-b-2 focus:border-neutral-200 border-neutral-600"
                    />
                    <span className="absolute bottom-2 right-4 text-xs text-neutral-600">{aboutText.length}/200</span>
                </div>
            </div>

            <Button className="col-span-3" type="submit">
                Зарегистрироваться
            </Button>
        </form>
    );
}
