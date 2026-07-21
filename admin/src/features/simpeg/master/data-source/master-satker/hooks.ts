import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {masterSatkerItem, masterSatkerListAll, masterSatkerList, masterSatkerCreate} from "./types"
import { callAPI } from "@/lib/api";


export const useGetMasterSatkerOption = () => {
    
}
export const useGetMasterSatker = (url:string) => {
    const {} = useQuery({
        queryFn : ()=> callAPI(url),
        queryKey : [""]
    })
}
export const useCreateMasterSatker = () => {

}

export const useDeleteMasterSatker = () => {

}



