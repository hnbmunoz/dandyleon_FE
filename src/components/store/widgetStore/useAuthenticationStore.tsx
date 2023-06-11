import {create} from "zustand";

interface AuthState {
  displayAuthentication: boolean;
  showAuthentication: () => void;
  hideAuthentication: () => void;
  
}
export const useAuthenticationStore = create<AuthState>((set) => ({
  displayAuthentication: false,
  showAuthentication: () => set({displayAuthentication: true}),
  hideAuthentication: () => set({displayAuthentication: false}), 
}))

