'use client';

import { useTheme } from 'next-themes';
import { IoMoon, IoSettingsSharp, IoSunny } from 'react-icons/io5';

import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton';
import { Menu, MenuRadio } from '@/components/ui/menu';

import { Header, HeaderTitle } from '@/hoc/Header';
import { MainContent } from '@/hoc/MainContent';

export default function Appearance() {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
    };

    return (
        <Page>
            <Header className="py-[16px]">
                <BackButton variant={'ghost'} />
                <HeaderTitle>Внешний вид</HeaderTitle>
            </Header>
            <MainContent>
                <div className="flex flex-col gap-4 p-[20px]">
                    <p className="font-geologica text-lg font-semibold">Тема приложения</p>
                    <Menu>
                        <MenuRadio
                            selected={theme === 'system'}
                            title="Как в системе"
                            Icon={IoSettingsSharp}
                            onClick={() => handleThemeChange('system')}
                        />
                        <MenuRadio
                            selected={theme === 'light'}
                            title="Светлая"
                            Icon={IoSunny}
                            onClick={() => handleThemeChange('light')}
                        />
                        <MenuRadio
                            selected={theme === 'dark'}
                            title="Темная"
                            Icon={IoMoon}
                            onClick={() => handleThemeChange('dark')}
                        />
                    </Menu>
                    <p className="text-sm text-neutral-500">
                        Определяет какую цветовую тему будет использовать приложение
                    </p>
                </div>
            </MainContent>
        </Page>
    );
}
