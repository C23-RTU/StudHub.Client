'use client';

import { FaGithub, FaGraduationCap } from 'react-icons/fa';

import LoaderImage from '@/components/ImageLoader/ImageLoader';
import { Page } from '@/components/Page';
import SettingsSection from '@/components/ProfileComponents/SettingSection';
import { BackButton } from '@/components/ui/BackButton';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

type Developer = {
    name: string;
    role: string;
    avatar: string;
};

function DeveloperItem({ name, role, avatar }: Developer) {
    return (
        <div className="flex w-full flex-row items-center gap-3 select-none">
            <LoaderImage
                loaderClassName="w-fit"
                src={avatar}
                alt="Avatar"
                className="size-12 shrink-0 grow-0 rounded-full"
                width={128}
                height={128}
            />
            <div className="flex w-full flex-col">
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-sm text-neutral-500">{role}</p>
            </div>
        </div>
    );
}

export default function About() {
    const developers: Developer[] = [
        {
            name: 'Денис Шаталов',
            role: 'Руководитель, Backend разработчик',
            avatar: 'https://avatars.githubusercontent.com/u/162514537?v=4',
        },
        {
            name: 'Владимир Архипенков',
            role: 'Backend разработчик',
            avatar: 'https://avatars.githubusercontent.com/u/144772246?v=4',
        },
        {
            name: 'Константин Жигайло',
            role: 'Frontend разработчик, Дизайнер',
            avatar: 'https://avatars.githubusercontent.com/u/89439507?v=4',
        },
        {
            name: 'Николай Гусев',
            role: 'Frontend разработчик, DevOps',
            avatar: 'https://avatars.githubusercontent.com/u/58086757?v=4',
        },
        {
            name: 'Станислав Купреев',
            role: 'Frontend разработчик',
            avatar: 'https://avatars.githubusercontent.com/u/84130430?v=4',
        },
    ];

    return (
        <Page>
            <Header className="py-[16px]">
                <BackButton variant={'ghost'} />
                <HeaderTitle>О приложении</HeaderTitle>
            </Header>
            <MainContent className="gap-0">
                <div className="border-border flex flex-col items-center gap-3 border-b p-[20px] pt-[8px] text-center">
                    <FaGraduationCap size={64} />
                    <p className="font-unbounded text-4xl font-extrabold">СТУДХАБ</p>
                    <p className="max-w-md text-sm text-neutral-800 dark:text-neutral-300">
                        Твоя студенческая жизнь в РТУ МИРЭА — все события и новости в одной сети.{' '}
                    </p>
                    <p className="text-sm text-neutral-500">Версия 1.0.0 от 16 августа 2025</p>
                </div>
                <div className="border-border flex flex-col gap-2 border-b p-[20px]">
                    <p className="font-geologica text-lg font-semibold">Команда разработки</p>
                    <div className="flex flex-col gap-4">
                        {developers.map((dev, index) => (
                            <DeveloperItem name={dev.name} role={dev.role} avatar={dev.avatar} key={index} />
                        ))}
                    </div>
                </div>
                <div className="border-border flex flex-col gap-2 border-b p-[20px]">
                    <p className="font-geologica text-lg font-semibold">Ссылки</p>
                    <div className="border-border bg-background-light flex flex-col rounded-md border">
                        <SettingsSection href="https://github.com/C23-RTU" title="GitHub" Icon={FaGithub} />
                        <SettingsSection
                            href="https://github.com/C23-RTU/StudHub.Client"
                            title="Репозиторий сайта"
                            Icon={FaGithub}
                        />
                    </div>
                </div>
                <p className="mx-auto max-w-lg p-[20px] text-center text-sm font-medium text-neutral-500">
                    © C23-RTU, 2025. СтудХаб является неофициальным студенческим проектом в рамках университета РТУ
                    МИРЭА.
                </p>
            </MainContent>
        </Page>
    );
}
