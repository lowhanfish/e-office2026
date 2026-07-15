import {create} from 'zustand'

const url = 'http://localhost:8000'

interface DataShowProps {
    id : string | number;
    value : string | number;
}

interface URLProps {
    APP :string,
    LOGIN : string,
    REGISTER : string
}

interface useUrlStoreProps {
    TOKEN : string,
    setTOKEN : (newToken : string)=>void,
    URL : URLProps,
    DataShow : DataShowProps[]
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
    DataShow : [
        {
            id: 2,
            value: "2 - Data tampil ",
        },
        {
            id: 8,
            value: "8 - Data tampil ",
        },
        {
            id: 25,
            value: "25 - Data tampil ",
        },
        {
            id: 50,
            value: "50 - Data tampil ",
        },
        {
            id: 100,
            value: "100 - Data tampil ",
        },

    ]
}))