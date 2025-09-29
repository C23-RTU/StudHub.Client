import { Page } from '@/components/Page';
import { PROFILE_SETTING_SECTIONS } from '@/components/ProfileComponents/profile-section.config';
import { BackButton } from '@/components/ui/BackButton';
import { Menu, MenuLink } from '@/components/ui/menu';

import MenuLogoutItem from '@/app/(auth)/(withMenuNavigation)/profile/settings/MenuLogoutItem';
import UserCard from '@/app/(auth)/(withMenuNavigation)/profile/settings/UserCard';
import UserClubs from '@/app/(auth)/(withMenuNavigation)/profile/settings/UserClubs';
import { Header, HeaderTitle } from '@/hoc/Header';
import { MainContent } from '@/hoc/MainContent';

export default function Settings() {
    return (
        <Page>
            <Header className="py-[16px]">
                <BackButton variant={'ghost'} />
                <HeaderTitle>Настройки</HeaderTitle>
            </Header>
            <MainContent>
                <div className="border-border m-[20px] mb-0 flex flex-row gap-4 rounded-md border p-[15px]">
                    <UserCard />
                </div>
                <div className="px-pageX flex flex-col gap-4">
                    <p className="text-muted font-semibold">Основные</p>
                    <Menu>
                        {PROFILE_SETTING_SECTIONS.sections.map((section, index) => (
                            <MenuLink key={index} title={section.title} href={section.href} Icon={section.Icon} />
                        ))}
                    </Menu>
                    <p className="text-muted font-semibold">Ваши клубы</p>
                    <UserClubs />
                    <p className="text-muted font-semibold">Прочее</p>
                    <Menu className="mb-8">
                        <MenuLogoutItem />
                        {PROFILE_SETTING_SECTIONS.other.map((section, index) => (
                            <MenuLink
                                key={index}
                                title={section.title}
                                href={section.href}
                                Icon={section.Icon}
                                hideChevron
                            />
                        ))}
                    </Menu>
                </div>
            </MainContent>
        </Page>
    );
}
