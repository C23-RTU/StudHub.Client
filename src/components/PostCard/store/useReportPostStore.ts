import { create } from 'zustand';

interface IPostReportDialogStore {
    open: boolean;
    postId: number | null;
    onOpenChange: (open: boolean) => void;
    openDialog: (postId: number) => void;
    closeDialog: () => void;
}

export const usePostReportDialogStore = create<IPostReportDialogStore>((set) => ({
    open: false,
    onOpenChange: (open) => set({ open }),
    postId: null,
    openDialog: (postId) => set({ open: true, postId }),
    closeDialog: () => set({ open: false, postId: null }),
}));
