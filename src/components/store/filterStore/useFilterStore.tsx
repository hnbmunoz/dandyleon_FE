import {create} from "zustand";

interface FilterState {
  setFilter: string;
  updateFilter: (newFilter: FilterState['setFilter']) => void;
  clearFilter: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  setFilter: "",
  updateFilter: (data: any) => set(() => ({ setFilter: data })),
  clearFilter: () => set(() => ({ setFilter: "" })),
}))

