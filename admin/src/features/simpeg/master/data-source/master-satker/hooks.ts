import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {masterSatkerItem, masterSatkerListAll, masterSatkerList, masterSatkerCreate} from "./types"
import { callAPI } from "@/lib/api";
import { useUrlStore } from "@/store/useUrlStore";



export const useGetMasterSatkerOption = () => {
    
}
export const useGetMasterSatker = () => {

    const url = useUrlStore(state => state.URL.APP)

    const {data:List, isLoading, isError, error} = useQuery({
        queryFn : ()=> callAPI<masterSatkerList>(`${url}/api/v1/simpeg/master/ref_satker/read`),
        queryKey : ["ref_satker"]
    })
    return {
        List :List,
        isLoading : isLoading,
        isError : isError,
        error : error
    }
}

export const useCreateMasterSatker = () => {

}

export const useDeleteMasterSatker = () => {

}



