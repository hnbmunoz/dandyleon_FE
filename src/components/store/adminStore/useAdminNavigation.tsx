import {create} from "zustand";

interface AdminNavigationState {
  defaultPanel: number;
  changePanel: (newProfile: AdminNavigationState['defaultPanel']) => void;
}

export const useAdminNavigation = create<AdminNavigationState>((set) => ({
  defaultPanel: 0,
  changePanel: (data: any) => set(() => ({ defaultPanel: data })),
}))

