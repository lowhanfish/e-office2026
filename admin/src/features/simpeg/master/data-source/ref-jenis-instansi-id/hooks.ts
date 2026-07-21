import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query"
import {RefJenisInstansiIdAll, RefJenisInstansiIdItem, RefJenisInstansiIdOption} from "./types"
import {callAPI} from "@/lib/api"
import { useUrlStore } from "@/store/useUrlStore"


export const useGetRefJenisInstansiIdAll = () => {
    const url = useUrlStore(state => state.URL.APP)

    const {data = [], isLoading, isError, error} = useQuery({
        queryFn : () => callAPI<RefJenisInstansiIdAll>(`${url}/api/v1/simpeg/master/ref_jenis_instansi_id/read`),
        queryKey : ["ref_jenis_instansi_id_all"]
    })

    const List:RefJenisInstansiIdOption[] = data.map((item:RefJenisInstansiIdItem)=>({
        id : item.kode,
        value : item.nama
    }))

    return {
        List : List,
        isLoading : isLoading,
        isError : isError,
        error : error
    };
    
}