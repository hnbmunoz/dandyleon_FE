import {create} from "zustand";

interface OrderModel {  
  prod_id: number | string | null;
  name: string;
  description: string;
  price: number;
  discount: number;
  net_price : number;
  image_url: string;
}

interface OrderState {
  ordered: OrderModel;
  loadOrder: (queriedList: OrderState['ordered']) => void
  clearOrder: () => void;  
}
export const useOrderStore = create<OrderState>((set) => ({
  ordered:  {
    prod_id: null,
    name: "",
    description: "",    
    price: 0,
    discount: 0,
    net_price: 0,
    image_url: ""
  },
  loadOrder: (newOrder: any) => set({ordered: newOrder}),
  clearOrder: () => set({ordered:  {
    prod_id: null,
    name: "",
    description: "",
    price: 0,
    discount: 0,
    net_price: 0,
    image_url: ""
  }}), 
}))

