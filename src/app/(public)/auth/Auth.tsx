'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Switcher } from '@/components/ui/Switcher/Switcher';

import Login from './Forms/Login';
import Register from './Forms/Register';

enum Tabs {
    LOGIN = 0,
    REGISTRATION = 1,
}

export default function Auth() {
    const [formType, setFormType] = useState<Tabs>(Tabs.REGISTRATION);

    return (
        <div className="flex flex-col items-center gap-3">
            <Image src={'/img/logo.png'} width={255} height={255} quality={100} alt="logo" />
            <Switcher tabs={['Вход', 'Регистация']} activeTabIndex={formType} onChange={setFormType} />

            <div className="w-full">
                {formType === Tabs.LOGIN && <Login />}
                {formType === Tabs.REGISTRATION && <Register />}
            </div>
        </div>
    );
}
