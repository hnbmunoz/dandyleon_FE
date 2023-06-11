import {create} from "zustand";

interface OrderViewState {
  viewOrder: boolean;
  showOrder: () => void;
  hideOrder: () => void;  
}

export const useOrderView = create<OrderViewState>((set) => ({
  viewOrder: false,
  showOrder: () => set({viewOrder: true}),
  hideOrder: () => set({viewOrder: false}), 
}))

