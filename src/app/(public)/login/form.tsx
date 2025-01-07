"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Eye, EyeClosed } from 'lucide-react';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        // Тут уже работаем с апишкой
    }
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input placeholder="Почта" type="email" />
            <div className="relative">
                <Input name='password' placeholder="Пароль" type={showPassword ? "text" : "password"} />
                {showPassword ? (
                    <Eye className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" size={20} 
                        onClick={() => setShowPassword(!showPassword)} />
                ) : (
                    <EyeClosed className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" size={20} 
                        onClick={() => setShowPassword(!showPassword)}/>
                )}
            </div>
            <Button type="submit">Войти</Button>
        </form>
    );
}
