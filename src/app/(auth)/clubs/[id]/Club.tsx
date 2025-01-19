'use client';

import { AnimatePresence, motion as m } from 'framer-motion';
import { CircleAlert, Copy, MapPin, OctagonAlert, UsersRound } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

import { PostCard } from '@/components/PostCard/PostCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import { MoreButton } from '@/components/ui/MoreButton/MoreButton';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';
import { SubscribeButton } from '@/components/ui/SubscribeButton/SubscribeButton';

import { MainContent } from '@/hoc/MainContent/MainContent';
import type { Post } from '@/lib/types/post';

export function Club({ posts = [] }: { posts: Post[] }) {
    const router = useRouter();

    const pathname = usePathname();

    const [moreVisible, setMoreVisible] = useState<boolean>(false);

    return (
        <div className="page relative">
            <div className="fixed top-10 left-0 right-0 flex justify-between items-center mx-5">
                <div className="flex items-center">
                    <BackButton />
                    <p
                        className="text-xl ml-5 font-bold bg-secondary rounded-lg py-1 px-2 hover:cursor-pointer"
                        onClick={() => navigator.clipboard.writeText('@IKB_MIREA')}
                        // сделать tooltip
                    >
                        @IKB_MIREA
                    </p>
                </div>
                <MoreButton onClick={() => setMoreVisible(!moreVisible)} />
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <img src={'/img/background.jpg'} alt={'banner'} className="rounded-b-lg w-[70%]" />
            </div>

            <div className="w-full h-full flex items-center justify-center mt-[-90px]">
                <Image src={'/img/profile.png'} height={200} width={200} alt={'banner'} className="rounded-b-lg" />
            </div>

            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-center">ИКБ РТУ МИРЭА</h1>

                <p className="text-center opacity-50">Будет падать - будем думать</p>

                <p className="text-center">
                    Институт кибербезопасности и цифровых технологий — структурное подразделение МИРЭА — Российского
                    технологического университета, реализующее подготовку студентов в области обеспечения информационной
                    безопасности, защиты национального киберпространства, экономической безопасности...
                </p>
            </div>

            <div className="flex flex-col gap-2 mt-5">
                <div className="relative">
                    <a onClick={() => router.push(`${pathname}}/subscribers`)} className="ml-8 hover:cursor-pointer">
                        1.1М подписчиков
                    </a>
                    <UsersRound className="absolute left-0 top-0" />
                </div>
                <div className="relative">
                    <a href="#" className="ml-8">
                        г. Москва, ул. Стромынка д.20
                    </a>
                    <MapPin className="absolute left-0 top-0" />
                </div>
                <div className="relative">
                    <a href="#" className="ml-8 font-bold">
                        Подробная информация
                    </a>
                    <CircleAlert className="absolute left-0 top-0" />
                </div>
            </div>

            <SubscribeButton />

            <AnimatePresence>
                {moreVisible && (
                    <ClickAwayListener onClickAway={() => setMoreVisible(false)}>
                        <m.div
                            className="fixed top-10 right-10 px-10 rounded-lg flex flex-col gap-5 py-5 bg-secondary shadow-md"
                            layoutId="more"
                            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                        >
                            <div className="relative hover:cursor-pointer">
                                <Copy className="absolute top-0 left-0" />
                                <p className="ml-10">Скопировать ссылку</p>
                            </div>

                            <div className="relative hover:cursor-pointer">
                                <OctagonAlert stroke="#FF0000" className="absolute top-0 left-0" />
                                <p className="ml-10 text-[#FF0000]">Пожаловаться</p>
                            </div>
                        </m.div>
                    </ClickAwayListener>
                )}
            </AnimatePresence>

            <MainContent>
                <p className="text-xl font-semibold">Посты</p>
                <SearchInput placeholder="Поиск по постам..." />
                <div className="flex flex-col gap-10">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => <PostCard key={post.id} post={post} />)
                    ) : (
                        <p className="m-auto">Нет постов</p>
                    )}
                </div>
            </MainContent>
        </div>
    );
}
