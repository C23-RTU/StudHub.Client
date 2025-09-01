'use client';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

import { Switcher } from '@/components/ui/Switcher/Switcher';
import { SkeletonList } from '@/components/ui/skeleton';

const LoginDynamic = dynamic(() => import('./Forms/Login'), {
    loading: () => <SkeletonList classNameSkeletonItem="h-[38px]" count={3} />,
});
const RegisterDynamic = dynamic(() => import('./Forms/Register'), {
    loading: () => <SkeletonList classNameSkeletonItem="h-[38px]" count={9} />,
});

enum Tabs {
    LOGIN = 0,
    REGISTRATION = 1,
}

export default function Auth() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const formType = useMemo(
        () => (searchParams.get('type') === 'register' ? Tabs.REGISTRATION : Tabs.LOGIN),
        [searchParams]
    );

    const handleChange = useCallback(
        (index: Tabs) => {
            const nextType = index === Tabs.REGISTRATION ? 'register' : 'login';
            if (searchParams.get('type') !== nextType) {
                router.replace(`/auth?type=${nextType}`);
            }
        },
        [router, searchParams]
    );

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
                    {formType === Tabs.LOGIN && <LoginDynamic />}
                    {formType === Tabs.REGISTRATION && <RegisterDynamic />}
                </div>
                <small className="text-center text-xs text-neutral-400 dark:text-neutral-600">
                    © C23-RTU, 2025. СтудХаб является неофициальным студенческим проектом в рамках университета РТУ
                    МИРЭА.
                </small>
            </div>
        </div>
    );
}
