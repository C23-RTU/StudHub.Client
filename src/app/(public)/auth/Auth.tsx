'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SetkaLogo } from '@/components/logo';
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
        <div className="flex flex-col items-center gap-3 my-auto w-full">
            {/* <Image src={'/img/logo.png'} width={255} height={255} quality={100} alt="logo" /> */}
            <div className="flex flex-col items-start w-full">
                <div className="flex flex-row gap-4 items-center">
                    <h1 className="text-6xl font-unbounded font-bold">СТУДХАБ</h1>
                    {/*<SetkaLogo className="w-10 h-10" />*/}
                </div>

                <p className="text-lg text-neutral-300 my-3 font-geologica">
                    Социальная сеть для студентов РТУ МИРЭА с новостями из жизни университета
                </p>
            </div>

            <Switcher tabs={['Вход', 'Регистрация']} activeTabIndex={formType} onChange={handleChange} />

            <div className="w-full">
                {formType === Tabs.LOGIN && <Login />}
                {formType === Tabs.REGISTRATION && <Register />}
            </div>

            <small className="text-center font-semibold text-xs text-neutral-500">
                © C23-RTU, 2025. Сетка является неофициальным студенческим проектом в рамках университета РТУ МИРЭА.
            </small>
        </div>
    );
}
