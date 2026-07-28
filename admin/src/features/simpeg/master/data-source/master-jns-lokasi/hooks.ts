import {MasterJnsLokasiItem, MasterJnsLokasiList, MasterJnsLokasiCreate} from "./types"
import { fetchData } from "@/lib/api_secure"
import { useUrlStore } from "@/store/useUrlStore"
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query"



export const useMasterJnsLokasiList = (debounced:string, pageSelect:number, pageLimit:number, search:string) => {
    const url =  useUrlStore(state => state.URL.APP)
    const {data, isLoading, isError, error} = useQuery({
        queryFn : ()=> fetchData<MasterJnsLokasiList>(
            `${url}/api/v1/simpeg/master/ref_jns_lokasi/read?skip=${((pageSelect-1)*pageLimit)}&limit=${pageLimit}${search? `&search=${debounced}`:""}`
        ),
        queryKey : ["ref_jns_lokasi", pageSelect, pageLimit, debounced]
    })
    return {
        List : data,
        isLoading : isLoading,
        isError : isError,
        error : error
    }
}

export const useMasterJnsLokasiDelete = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryclient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn : (id:string) => fetchData(
            `${url}/api/v1/simpeg/master/ref_jns_lokasi/delete/${id}`,
            {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                }
            }
        ),
        onSuccess : ()=>{
            queryclient.invalidateQueries({queryKey:["ref_jns_lokasi"]})
        },
        onError : (error)=> {
            alert(error)
        }
    })
    return deleteMutation
}


export const useMasterJnsLokasiCreate = ()=>{

}