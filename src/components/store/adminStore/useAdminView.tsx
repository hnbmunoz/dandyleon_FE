import {create} from "zustand";

interface AdminViewState {
  toAdmin: boolean;
  showAdminDashboard: () => void;
  hideAdminDashboard: () => void;  
}

export const useAdminView = create<AdminViewState>((set) => ({
  toAdmin: false,
  showAdminDashboard: () => set({toAdmin: true}),
  hideAdminDashboard: () => set({toAdmin: false}), 
}))

