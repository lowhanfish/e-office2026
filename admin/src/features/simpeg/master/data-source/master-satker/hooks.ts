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
        queryFn : ()=> fetchData<masterSatkerList>(`${url}/api/v1/simpeg/master/ref_satker/read?skip=${((pageSelect - 1) * pageLimit)}&limit=${pageLimit}${search ? `&search=${debounced}` : ""}`),
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
    const queryclient = useQueryClient()
    const createDataMutation = useMutation({
        mutationFn : ({newUrl, newForm, method}:{newUrl:string, newForm:masterSatkerCreate, method:string})=>fetchData(
            newUrl,
            {
                headers : {
                    "Content-Type" : "application/json",
                },
                method : method,
                body : JSON.stringify(newForm)

            }
        ),
        onSuccess: ()=>{
            queryclient.invalidateQueries({queryKey:["ref_satker"]})
        },
        onError: (error)=>{
            alert(error)
        }
    })

    return createDataMutation

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



