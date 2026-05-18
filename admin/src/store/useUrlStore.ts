import {create} from 'zustand'

const url = 'http://localhost:3000'

interface URLProps {
    APP :string,
    LOGIN : string,
    REGISTER : string
}


interface useUrlStoreProps {
    TOKEN : string,
    setTOKEN : (newToken : string)=>void,
    URL : URLProps
}

export const useUrlStore = create<useUrlStoreProps>((set)=>({
    TOKEN : "",
    // setTOKEN : () => set((state)=>({TOKEN : state.TOKEN})),
    setTOKEN : (newToken) => set({TOKEN : newToken}),
    URL : {
        APP      : url,
        LOGIN    : url+'/login',
        REGISTER : url+'/register',
    },
}))