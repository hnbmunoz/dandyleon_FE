import {create} from "zustand";

interface ProductModel {  
  id: number | null;
  name: string;
  description: string;
  category_id : number;
  price: number;
  discount: number;
  image_url: string;
}

interface ProductState {
  productList: ProductModel[];
  loadProduct: (queriedList: ProductState['productList']) => void
  addNewProduct: (newInfo : ProductModel) => void;  
}
export const useProductStore = create<ProductState>((set) => ({
  productList:  [],
  loadProduct: (list: any) => set({productList: list}),
  addNewProduct: (newData: any) => set({productList: [...newData.productList, newData]}), 
}))

