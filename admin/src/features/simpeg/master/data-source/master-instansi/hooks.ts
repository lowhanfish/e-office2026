import { fetchData } from "@/lib/api_secure"
import { useUrlStore } from "@/store/useUrlStore"
import {useQuery} from "@tanstack/react-query"
import {masterInstansiItem, masterInstansiCreate, masterInstansiList, masterInstansiListAll} from "./types"


export const useGetMasterInstansiOption = () => {
    const url = useUrlStore(state => state.URL.APP)
    const {data} = useQuery({
        queryFn : () => fetchData<masterInstansiListAll>(
            `${url}/api/v1/simpeg/master/ref_instansi/options`
        ),
        queryKey : ["ref_instansi_option"]
    })

    const option = data?.map((item)=>(
        {
            id : item.kode,
            value : item.nama
        }
    ))

    console.log(option)

    return option
}