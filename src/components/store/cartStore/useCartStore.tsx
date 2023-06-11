import {create} from "zustand";

interface CartState {
  myCart: boolean;
  showCart: () => void;
  hideCart: () => void; 
}
export const useCartStore = create<CartState>((set) => ({
  myCart: false,
  showCart: () => set({myCart: true}),
  hideCart: () => set({myCart: false}), 
}))

