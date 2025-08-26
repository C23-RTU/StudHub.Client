import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton';
import { Input } from '@/components/ui/input';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default function Report() {
    return (
        <Page>
            <Header className="py-[16px]">
                <BackButton variant={'ghost'} />
                <HeaderTitle>Пожаловаться</HeaderTitle>
            </Header>
            <MainContent className="p-[20px]">
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">На кого жалоба</p>
                    <Input placeholder="Выбор что на клуб, комент и тп" />
                    <p className="text-xs text-neutral-500">Выберите на что вы хотите пожаловаться.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">ID Клуба</p>
                    <Input placeholder="Выбор что на клуб, комент и тп" />
                    <p className="text-xs text-neutral-500">ID Клуба можно получит</p>
                </div>
            </MainContent>
        </Page>
    );
}
