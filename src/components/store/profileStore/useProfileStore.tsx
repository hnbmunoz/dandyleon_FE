import {create} from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ProfileState {
  profile: {token: "", display: "", is_admin: false};
}

interface ProfileAction {
  overwriteProfile: (newProfile: ProfileState['profile']) => void;
  clearProfile: () => void;
}

export const userProfileStore = create<ProfileState & ProfileAction>()(
  devtools(
    persist((set) => ({
      profile: {token: "", display: "", is_admin: false},    
      overwriteProfile: (data: any) => set(() => ({ profile: data })),
      clearProfile: () => {  
        set(() => ({ profile: {token: "", display: "", is_admin: false}}))     
      }   
    }),
    {name: "global"}
    )
  )
)
