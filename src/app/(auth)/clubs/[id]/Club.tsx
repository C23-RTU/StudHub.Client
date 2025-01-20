'use client';

import { CircleAlert, Copy, EllipsisVertical, MapPin, OctagonAlert, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { BackButton } from '@/components/ui/BackButton/BackButton';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';
import { SubscribeButton } from '@/components/ui/SubscribeButton/SubscribeButton';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MainContent } from '@/hoc/MainContent/MainContent';

export function Club({ id = '1' }: { id: string }) {
    return (
        <div className="relative p-0">
            <div>
                <div className="fixed flex flex-row justify-between items-center p-4 w-full max-w-[1024px]">
                    <div className="flex flex-row items-center">
                        <BackButton />
                        <p
                            className="text-lg ml-4 font-bold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary font-geologica rounded-lg leading-8 h-10 py-1 px-3 hover:cursor-pointer"
                            onClick={() => navigator.clipboard.writeText('@IKB_MIREA')}
                            // сделать tooltip
                        >
                            @IKB_MIREA
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={'outline'}
                                size="icon"
                                className="rounded-lg w-10 h-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary"
                            >
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Copy />
                                Скопировать ссылку
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[#FF0000]">
                                <OctagonAlert stroke="#FF0000" />
                                Пожаловаться
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="w-full h-full flex items-center justify-center">
                    <Image
                        src={'/img/background.jpg'}
                        height={200}
                        width={600}
                        alt={'banner'}
                        className="rounded-b-3xl w-full"
                    />
                </div>

                <div className="w-full h-full flex items-center justify-center mt-[-90px]">
                    <Image src={'/img/profile.png'} height={158} width={158} alt={'banner'} className="rounded-b-lg" />
                </div>
            </div>
            <div className="page pt-0">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-center">ИКБ РТУ МИРЭА</h1>

                    <p className="text-center opacity-50">Будет падать - будем думать</p>

                    {/* <p className="text-center">
                        Институт кибербезопасности и цифровых технологий — структурное подразделение МИРЭА — Российского
                        технологического университета, реализующее подготовку студентов в области обеспечения
                        информационной безопасности, защиты национального киберпространства, экономической
                        безопасности...
                    </p> */}
                </div>

                <div className="flex flex-col gap-2 mt-5">
                    <Link
                        href={`/clubs/${id}/subscribers`}
                        className="flex gap-2 flex-row items-center cursor-pointer text-neutral-50"
                    >
                        <UsersRound />
                        1.1М подписчиков
                    </Link>
                    <section className="flex gap-2 flex-row items-center cursor-pointer text-neutral-50">
                        <MapPin />
                        г. Москва, ул. Стромынка д.2f
                    </section>
                    <section className="flex gap-2 flex-row items-center cursor-pointer text-neutral-50">
                        <CircleAlert />
                        Подробная информация
                    </section>
                </div>

                <SubscribeButton />

                <MainContent>
                    <p className="text-xl font-semibold">Посты</p>
                    <SearchInput placeholder="Поиск по постам..." />
                    <div className="flex flex-col gap-10">
                        {/* {posts && posts.length > 0 ? (
                            posts.map((post) => <PostCard key={post.id} post={post} />)
                        ) : (
                            <p className="m-auto">Нет постов</p>
                        )} */}
                    </div>
                </MainContent>
            </div>
        </div>
    );
}
