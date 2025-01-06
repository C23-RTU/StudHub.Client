import { create } from "zustand";
import { IAppStore } from "./types/appStore.type";

export const useAppStore = create<IAppStore>(() => ({
  test: ""
}))