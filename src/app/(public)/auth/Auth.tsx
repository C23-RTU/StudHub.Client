'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

import { Switcher } from '@/components/ui/Switcher/Switcher';

import Login from './Forms/Login';
import Register from './Forms/Register';

enum Tabs {
    LOGIN = 0,
    REGISTRATION = 1,
}

export default function Auth() {
    const [formType, setFormType] = useState<Tabs>(Tabs.LOGIN);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const type = searchParams.get('type');
        return type === 'register' ? setFormType(Tabs.REGISTRATION) : setFormType(Tabs.LOGIN);
    }, [searchParams]);

    const handleChange = (index: Tabs) => {
        setFormType(index);
        router.push(`/auth?type=${index === Tabs.REGISTRATION ? 'register' : 'login'}`);
    };

    return (
        <div className="px-pageX flex min-h-screen w-full items-center justify-center bg-neutral-50 dark:bg-neutral-900">
            <div className="m-auto flex w-full max-w-lg flex-col items-center gap-3">
                {/*TODO: Заменить на SVG-шку*/}
                <figure className={'flex flex-col items-center gap-2 text-black md:flex-row md:gap-4 dark:text-white'}>
                    <FaGraduationCap size={64} />
                    <p className="font-unbounded text-4xl font-extrabold md:text-5xl">СТУДХАБ</p>
                </figure>

                <p className="font-inter text-center text-sm text-neutral-600 dark:text-neutral-400">
                    Твоя студенческая жизнь в РТУ МИРЭА — все события и новости в одной сети.
                </p>
                <Switcher tabs={['Вход', 'Регистрация']} activeTabIndex={formType} onChange={handleChange} />
                <div className="w-full">
                    {formType === Tabs.LOGIN && <Login />}
                    {formType === Tabs.REGISTRATION && <Register />}
                </div>
                <small className="text-center text-xs text-neutral-400 dark:text-neutral-600">
                    © C23-RTU, 2025. СтудХаб является неофициальным студенческим проектом в рамках университета РТУ
                    МИРЭА.
                </small>
            </div>
        </div>
    );
}
