import {create} from "zustand";

interface LoaderState {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  
}
export const useLoaderStore = create<LoaderState>((set) => ({
  loading:  true,
  showLoading: () => set({loading: true}),
  hideLoading: () => set({loading: false}), 
}))

