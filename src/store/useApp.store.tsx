import { create } from 'zustand';

import type { IAppStore } from './types/appStore.type';

export const useAppStore = create<IAppStore>(() => ({
    test: '',
}));
