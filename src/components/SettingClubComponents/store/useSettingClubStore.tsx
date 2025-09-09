import { create } from 'zustand';

import type { PersonSummaryDTO } from '@/api/axios-client/models';

interface IUseSettingClubStore {
    userToRemove: PersonSummaryDTO | null;
    setUserToRemove: (user: PersonSummaryDTO | null) => void;
}

export const useSettingClubStore = create<IUseSettingClubStore>((set) => ({
    userToRemove: null,
    setUserToRemove: (userToRemove) => {
        set({
            userToRemove,
        });
    },
}));
