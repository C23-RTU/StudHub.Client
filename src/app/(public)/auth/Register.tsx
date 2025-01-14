'use client';

import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export default function RegistrationForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedInstitute, setSelectedInstitute] = useState<string | null>(null);
    const [aboutText, setAboutText] = useState('');

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 400) {
            setAboutText(event.target.value);
        }
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = {
            name: (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
            surname: (event.currentTarget.elements.namedItem('lastname') as HTMLInputElement).value,
            middlename: (event.currentTarget.elements.namedItem('middlename') as HTMLInputElement)?.value || '',
            age: parseInt((event.currentTarget.elements.namedItem('age') as HTMLInputElement).value) || null,
            institute: (event.currentTarget.elements.namedItem('institute') as HTMLInputElement)?.value || '',
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
        <form className="grid gap-4 grid-cols-3" onSubmit={handleSubmit}>
            <Input name="name" placeholder="Имя" type="text" required />
            <Input name="lastname" placeholder="Фамилия" type="text" required />
            <Input name="middlename" placeholder="Отчество" type="text" />
            <div className="col-span-3">
                <Input name="email" placeholder="Почта" type="email" required />
            </div>
            <div className="grid gap-4 grid-cols-2 col-span-3">
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
                <Input
                    className="col-span-1"
                    name="confirmPassword"
                    placeholder="Повторите пароль"
                    type={showPassword ? 'text' : 'password'}
                />
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
                <Input name="age" placeholder="Возраст" type="integer" />
                <div className="col-span-full">
                    <div className="relative w-full">
                        <textarea
                            name="about"
                            placeholder="О себе"
                            value={aboutText}
                            onChange={handleTextChange}
                            rows={6}
                            className="w-full rounded-lg bg-secondary border px-4 py-2 text-sm focus:outline-none border focus:border-neutral-200 border-neutral-600"
                        />
                        <span className="absolute bottom-2 right-4 text-xs text-[#fff] select-none">
                            {aboutText.length}/{400}
                        </span>
                    </div>
                </div>
            </div>

            <Button className="col-span-3" type="submit">
                Зарегистрироваться
            </Button>
        </form>
    );
}
