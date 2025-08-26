'use client';

import { useMediaQuery } from '@uidotdev/usehooks';
import React, { createContext, useContext } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter as RDialogFooter,
    DialogHeader as RDialogHeader,
    DialogTitle as RDialogTitle,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerDescription as RDrawerDescription,
    DrawerHeader as RDrawerHeader,
    DrawerTitle as RDrawerTitle,
} from '@/components/ui/drawer';

type ResponsiveDialogContextValue = {
    isDesktop: boolean;
};

const ResponsiveDialogContext = createContext<ResponsiveDialogContextValue | null>(null);

function useResponsiveCtx() {
    const ctx = useContext(ResponsiveDialogContext);
    if (!ctx) throw new Error('ResponsiveDialog.* must be used within <ResponsiveDialog>');
    return ctx;
}

type RootProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    contentClassName?: string;
    children: React.ReactNode;
};

function ResponsiveDialogRoot({ open, onOpenChange, contentClassName, children }: RootProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)') ?? true;

    if (isDesktop) {
        return (
            <ResponsiveDialogContext.Provider value={{ isDesktop }}>
                <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent className={contentClassName}>{children}</DialogContent>
                </Dialog>
            </ResponsiveDialogContext.Provider>
        );
    }

    return (
        <ResponsiveDialogContext.Provider value={{ isDesktop }}>
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className={contentClassName}>{children}</DrawerContent>
            </Drawer>
        </ResponsiveDialogContext.Provider>
    );
}

type SubComponentProps = {
    children?: React.ReactNode;
    className?: string;
};

function Header({ children, className }: SubComponentProps) {
    const { isDesktop } = useResponsiveCtx();
    return isDesktop ? (
        <RDialogHeader className={className}>{children}</RDialogHeader>
    ) : (
        <RDrawerHeader className={className}>{children}</RDrawerHeader>
    );
}

function Title({ children, className }: SubComponentProps) {
    const { isDesktop } = useResponsiveCtx();
    return isDesktop ? (
        <RDialogTitle className={className}>{children}</RDialogTitle>
    ) : (
        <RDrawerTitle className={className}>{children}</RDrawerTitle>
    );
}

function Description({ children, className }: SubComponentProps) {
    const { isDesktop } = useResponsiveCtx();
    return isDesktop ? (
        <DialogDescription className={className}>{children}</DialogDescription>
    ) : (
        <RDrawerDescription className={className}>{children}</RDrawerDescription>
    );
}

function Footer({ children, className }: SubComponentProps) {
    const { isDesktop } = useResponsiveCtx();
    return isDesktop ? (
        <RDialogFooter className={className}>{children}</RDialogFooter>
    ) : (
        <DrawerFooter className={className}>{children}</DrawerFooter>
    );
}

function Body({ children, className }: SubComponentProps) {
    const { isDesktop } = useResponsiveCtx();
    return <div className={isDesktop ? className : ['p-5', className].filter(Boolean).join(' ')}>{children}</div>;
}

export const ResponsiveDialog = Object.assign(ResponsiveDialogRoot, {
    Header,
    Title,
    Description,
    Footer,
    Body,
});
