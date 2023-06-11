import {create} from "zustand";
import { ReactNode } from "react";

interface PopUpState {
  currentInterface: string | JSX.Element | JSX.Element[] | ReactNode | []  | null ;
  overwriteInterface: (newElement: PopUpState['currentInterface']) => void;
  
}

export const usePopUpInterface = create<PopUpState>((set) => ({
  currentInterface: null,
  overwriteInterface: (component: any) => set(() => ({ currentInterface: component })),
  
}))

