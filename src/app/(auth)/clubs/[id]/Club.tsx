'use client';

import { AnimatePresence, motion as m } from 'framer-motion';
import { CircleAlert, Copy, MapPin, OctagonAlert, SquareCheck, SquarePlus, UsersRound } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

import { BackButton } from '@/components/ui/BackButton/BackButton';
import { MoreButton } from '@/components/ui/MoreButton/MoreButton';
import { Button } from '@/components/ui/button';

export function Club() {
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);
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
                    <a href="#" className="ml-8">
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

            <div className="flex justify-center">
                {subscribed ? (
                    <Button
                        onClick={() => {
                            setUnsubVisible(true);
                        }}
                        className="mt-5 w-[60%] flex justify-center bg-secondary hover:bg-accent"
                    >
                        <span>Вы подписаны</span>
                        <SquarePlus />
                    </Button>
                ) : (
                    <Button onClick={() => setSubscribed(true)} className="mt-5 w-[60%] flex justify-center">
                        <span>Вступить</span>
                        <SquareCheck />
                    </Button>
                )}
            </div>

            <AnimatePresence>
                {unsubVisible && (
                    <ClickAwayListener onClickAway={() => setUnsubVisible(false)}>
                        <m.div
                            className="fixed rounded-lg left-40 right-40 bottom-20 flex flex-col p-5 bg-secondary shadow-md"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <p className="text-center">Вы хотите отписаться от клуба?</p>
                            <Button
                                className="w-[60%] justify-center mx-auto mt-3"
                                onClick={() => {
                                    setSubscribed(false);
                                    setUnsubVisible(false);
                                }}
                            >
                                Отписаться
                            </Button>
                        </m.div>
                    </ClickAwayListener>
                )}
            </AnimatePresence>

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
        </div>
    );
}
