import { Suspense } from 'react';

import { Page } from '@/components/Page';

import HomeFeed from '@/app/(auth)/(withMenuNavigation)/(home)/HomeFeed';
import { Header, HeaderTitle } from '@/hoc/Header';
import { MainContent } from '@/hoc/MainContent';
import { parseLocalTime } from '@/lib/utils/time.util';

export const dynamic = 'force-static';

export default function Home({ timeBasedGreeting }: { timeBasedGreeting: string }) {
    return (
        <Page>
            <Header className="justify-between">
                <HeaderTitle>{timeBasedGreeting}</HeaderTitle>
                <p className="font-medium text-neutral-500">
                    {parseLocalTime(Date(), { day: 'numeric', month: 'short' })}
                </p>
            </Header>
            <MainContent>
                <Suspense>
                    <HomeFeed />
                </Suspense>
            </MainContent>
        </Page>
    );
}
