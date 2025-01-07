"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        // Тут уже работаем с апишкой
    }
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input placeholder="Почта" type="email" />
            <Input placeholder="Пароль" type="password" />
            <Button type="submit">Войти</Button>
        </form>
    );
}
