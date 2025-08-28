import { create } from 'zustand';

interface IClubReportDialogStore {
    open: boolean;
    clubId: number | null;
    onOpenChange: (open: boolean) => void;
    openDialog: (clubId: number) => void;
    closeDialog: () => void;
}

export const useClubReportDialogStore = create<IClubReportDialogStore>((set) => ({
    open: false,
    clubId: null,
    onOpenChange: (open) => set({ open }),
    openDialog: (clubId) => set({ open: true, clubId }),
    closeDialog: () => set({ open: false, clubId: null }),
}));
