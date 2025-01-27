import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Clubs() {
    const clubsData = [
        {
            image: '/img/test.jpg',
            name: 'Клуб хакатонщиков',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu',
        },
        {
            image: '/img/test.jpg',
            name: 'Клуб хакатонщиков',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu',
        },
    ];

    return (
        <div className="page">
            <Header>
                <HeaderTitle>Поиск клубов</HeaderTitle>
            </Header>

            <MainContent>
                <SearchInput placeholder="Поиск по клубам..." />
                <div>
                    <p className="text-lg font-semibold mb-3">Рекомендуем</p>
                    <div className="flex flex-col gap-4">
                        {clubsData.map((club, index) => (
                            <ClubCard key={index} image={club.image} name={club.name} description={club.description} />
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-lg font-semibold mb-3">Популярные</p>
                    <div className="flex flex-col gap-4">
                        {clubsData.map((club, index) => (
                            <ClubCard key={index} image={club.image} name={club.name} description={club.description} />
                        ))}
                    </div>
                </div>
            </MainContent>
        </div>
    );
}
