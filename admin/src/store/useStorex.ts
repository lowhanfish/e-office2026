import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface StoreState {
    isSideBarOpen : boolean,
    setIsSideBarOpen : () => void,
    setIsSideBarStat : (status : boolean) => void
}

export const useStorex = create<StoreState>((set)=>({
    isSideBarOpen: false,
    setIsSideBarOpen : () => set((state)=>({isSideBarOpen : !state.isSideBarOpen})),
    setIsSideBarStat : (status) => set({isSideBarOpen : status})
}))