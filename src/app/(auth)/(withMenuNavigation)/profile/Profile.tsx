import { SettingBadge } from '@/components/Badge/SettingBadge/SettingBadge';
import { Avatar } from '@/components/ui/Avatar/Avatar';

import type { ClubDetailDTO, PersonDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { IdCard, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default async function Profile({ user, userClubs }: { user: PersonDetailDTO; userClubs: ClubDetailDTO[] }) {
    console.log(userClubs);

    return (
        <div className="page">
            <Header>
                <HeaderTitle>Профиль</HeaderTitle>
                <SettingBadge />
            </Header>

            <MainContent>
                <div className="flex flex-row gap-4">
                    <Avatar src={user.imagePath} size={80} alt={'Изображение профиля'} />
                    <div className="flex flex-col my-auto gap-0">
                        <p className="text-xl font-bold font-geologica max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-neutral-400">был недавно</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <MessageSquare size={20} />
                        <p className="text-sm">{user.about || '...'}</p>
                    </div>
                    {/* <div className="flex flex-row gap-2">
                        <IoMdMail size={20} />
                        <p className="text-sm font-geologica">zero@kostyazero.com</p>
                    </div> */}
                    <div className="flex flex-row gap-2">
                        <IdCard size={20} />
                        <p className="text-sm">{user.institute?.name || "Нет института"}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <p className="font-geologica font-bold text-lg">Подписки</p>
                        <Link href="/profile/clubs">
                            <a className="font-inter font-light text-primary">Показать все</a>
                        </Link>
                    </div>
                    {userClubs.length == 0 && <p className="text-neutral-400">Вы пока не подписаны ни на один клуб</p>}
                    {userClubs.map((club) => (
                        <ClubCard key={club.id} club={club} />
                    ))}
                </div>
                {/* <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <p className="font-geologica font-bold text-lg">Достижения</p>
                        <p className="font-inter font-light text-primary">Показать все</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <AchievementCard />
                        <AchievementCard />
                    </div>
                </div> */}
            </MainContent>
        </div>
    );
}

// async function AchievementCard() {
//     return (
//         <figure className="flex flex-col gap-4 p-4 rounded-xl bg-neutral-800 items-center text-center">
//             <Image
//                 src={
//                     'https://gravatar.com/avatar/d99cc6ace66fc8bd197c30c876b7224007211f4572ef6d8444693f67b4c33ab1?size=80'
//                 }
//                 alt={'Изображение клуба'}
//                 width={64}
//                 height={64}
//                 className="rounded-lg w-[64px] h-[64px]"
//             />
//             <div className="flex flex-col gap-2">
//                 <p className="font-geologica font-bold text-lg leading-none">Отчислен</p>
//                 <p className="text-sm font-inter text-neutral-400 max-h-[2.5rem] overflow-hidden text-ellipsis">
//                     Отчислится из РТУ МИРЭА
//                 </p>
//                 <p className="text-sm font-inter text-neutral-400">01.01.1970</p>
//             </div>
//         </figure>
//     );
// }
