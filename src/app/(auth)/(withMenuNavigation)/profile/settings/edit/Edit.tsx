import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default function Edit() {
    return (
        <Page>
            <Header className="py-[16px]">
                <BackButton variant={'ghost'} />
                <HeaderTitle>Изменить профиль</HeaderTitle>
            </Header>
            <MainContent>
                <p className="p-[20px] text-center text-neutral-500">Данный раздел еще не готов</p>
            </MainContent>
        </Page>
    );
}
