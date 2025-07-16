'use client';

import { GraduationCapIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
        <div className="flex flex-col items-center mx-auto max-w-xl gap-3 my-auto w-full">
            {/*TODO: Заменить на SVG-шку*/}

            <figure className={'flex flex-row items-center gap-4'}>
                <GraduationCapIcon size={64} />
                <p className="text-5xl font-unbounded font-extrabold">СТУДХАБ</p>
            </figure>

            <p className="text-sm text-neutral-300 text-center font-inter">
                Твоя студенческая жизнь в РТУ МИРЭА — все события и новости в одной сети.
            </p>
            <Switcher tabs={['Вход', 'Регистрация']} activeTabIndex={formType} onChange={handleChange} />
            <div className="w-full">
                {formType === Tabs.LOGIN && <Login />}
                {formType === Tabs.REGISTRATION && <Register />}
            </div>
            <small className="text-center font-semibold text-xs text-neutral-500">
                © C23-RTU, 2025. СтудХаб является неофициальным студенческим проектом в рамках университета РТУ МИРЭА.
            </small>
        </div>
    );
}
