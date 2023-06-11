import {create} from "zustand";

interface BlurState {
  toBlur: boolean;
  showBlur: () => void;
  hideBlur: () => void; 
}
export const useBlurStore = create<BlurState>((set) => ({
  toBlur: false,
  showBlur: () => set({toBlur: true}),
  hideBlur: () => set({toBlur: false}), 
}))

