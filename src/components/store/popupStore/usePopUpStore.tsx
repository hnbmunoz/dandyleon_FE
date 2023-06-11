import {create} from "zustand";

interface PopUpState {
  displayPopUp: boolean;
  showPopUp: () => void;
  hidePopUp: () => void;  
}

export const usePopUpStore = create<PopUpState>((set) => ({
  displayPopUp: false,
  showPopUp: () => set({displayPopUp: true}),
  hidePopUp: () => set({displayPopUp: false}), 
}))

