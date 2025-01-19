'use client';

import { AnimatePresence, motion as m } from 'framer-motion';
import { SquareCheck, SquarePlus } from 'lucide-react';
import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

import { Button } from '../button';

export function SubscribeButton() {
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [unsubVisible, setUnsubVisible] = useState<boolean>(false);

    return (
        <div className="">
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
                            className="fixed rounded-lg left-40 right-40 bottom-20 flex flex-col p-5 bg-secondary shadow-md z-50"
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
        </div>
    );
}
