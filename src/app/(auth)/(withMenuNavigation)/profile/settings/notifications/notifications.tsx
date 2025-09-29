import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton';

import { Header, HeaderTitle } from '@/hoc/Header';
import { MainContent } from '@/hoc/MainContent';

export default function Notifications() {
    return (
        <Page>
            <Header className="py-[16px]">
                <BackButton variant={'ghost'} />
                <HeaderTitle>Уведомления</HeaderTitle>
            </Header>
            <MainContent>
                <p className="p-[20px] text-center text-neutral-500">Данный раздел еще не готов</p>
            </MainContent>
        </Page>
    );
}
