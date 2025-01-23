import { ClubCard } from '@/components/ClubCard/ClubCard';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Clubs() {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>Поиск клубов</HeaderTitle>
            </Header>

            <MainContent>
                <div>
                    <SearchInput placeholder="Поиск..." />
                </div>
                <p className="text-lg font-semibold">Рекомендуем</p>
                <div className="flex flex-col gap-4">
                    <ClubCard
                        image="/img/test.jpg"
                        name="Клуб хакатонщиков"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu"
                    />
                    <ClubCard
                        image="/img/test.jpg"
                        name="Клуб хакатонщиков"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu"
                    />
                </div>
                <p className="text-lg font-semibold">Популярные</p>
                <div className="flex flex-col gap-4">
                    <ClubCard
                        image="/img/test.jpg"
                        name="Клуб хакатонщиков"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu"
                    />
                    <ClubCard
                        image="/img/test.jpg"
                        name="Клуб хакатонщиков"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu"
                    />
                </div>
            </MainContent>
        </div>
    );
}
