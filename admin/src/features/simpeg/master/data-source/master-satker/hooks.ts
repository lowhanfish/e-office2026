import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {masterSatkerItem, masterSatkerListAll, masterSatkerList, masterSatkerCreate} from "./types"
import { callAPI } from "@/lib/api";

import { useUrlStore } from "@/store/useUrlStore";
import { fetchData } from "@/lib/api_secure";



export const useGetMasterSatkerOption = () => {
    
}
export const useGetMasterSatker = (pageSelect:number, pageLimit:number, search:string, debounced:string) => {

    const url = useUrlStore(state => state.URL.APP)
    const {data:List, isLoading, isError, error} = useQuery({
        queryFn : ()=> fetchData<masterSatkerList>(`${url}/api/v1/simpeg/master/ref_satker/read?skip=${pageSelect - 1}&limit=${pageLimit}${search ? `&search=${debounced}` : ""}`),
        queryKey : ["ref_satker", pageSelect, pageLimit, debounced]
    })
    return {
        List :List,
        isLoading : isLoading,
        isError : isError,
        error : error
    }
}

export const useCreateMasterSatker = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()
    const mutationData = useMutation({
        mutationFn : (newForm:masterSatkerCreate)=> fetchData(
            `${url}/api/v1/simpeg/master/ref_satker/creat`,
            {
                headers : {
                    "Content-Type" : "application/json",
                },
                method : "POST",
                body : JSON.stringify(newForm)
            }
        ),
        onSuccess : ()=>{
            queryClient.invalidateQueries({queryKey: ["ref_satker"]})
        },
        onError : (error)=> {
            alert(error)
        }

    })

    return mutationData
}

export const useDeleteMasterSatker = () => {
     const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()

    const mutationData = useMutation({
        mutationFn : (id:string)=> fetchData(
            `${url}/api/v1/simpeg/master/ref_satker/delete/${id}`,
            {
                headers : {
                    "Content-Type" : "application/json",
                },
                method : "DELETE",
            }
        ),
        onSuccess : ()=>{
            queryClient.invalidateQueries({queryKey: ["ref_satker"]})
        },
        onError : (error)=> {
            alert(error)
        }

    })

    return mutationData



}



