import {create} from "zustand";

interface CategoryModel {  
  id: number | null;
  name: string;
  description: string;
  url: string;
}

interface CategoryState {
  categoryList: CategoryModel[];
  loadCategory: (queriedList: CategoryState['categoryList']) => void
  addNewCategory: (newInfo : CategoryModel) => void;  
}
export const useCategoryStore = create<CategoryState>((set) => ({
  categoryList:  [],
  loadCategory: (list: any) => set({categoryList: list}),
  addNewCategory: (newData: any) => set({categoryList: [...newData.categoryList, newData]}), 
}))

