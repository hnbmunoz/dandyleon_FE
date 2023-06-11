import {create} from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartItemState {
  // cartItems: {token: "", display: "", is_admin: false};
  cartItems:{ 
    // product_id : number,
    // product_name: string,
    // price: number,
    // qty: number,
    // gross_price : number,
    // discount: number,
    // net_price :number
    cartIdx: string
    product_id: number | string | null
    product_name: string
    price: number
    qty: number | string
    net_price:number
  }[]
  
}

// interface CartItemState {
//   product_id: number
//   product_name: string
//   price: number
//   qty: number
//   net_price:number
// }

interface CartItemAction {
  overwriteCart: (myCart: CartItemState['cartItems']) => void;
  clearCart: () => void;
}

export const useCartItems = create<CartItemState & CartItemAction>()(
  devtools(
    persist((set) => ({
      // cartItems: {token: "", display: "", is_admin: false},    
      cartItems: [] ,  

      overwriteCart: (data: any) => set(() => ({ cartItems: data })),
      clearCart: () => {  
        set(() => ({ cartItems: []}))     
      }   
    }),
    {name: "global"}
    )
  )
)
