import { fetchData } from "@/lib/api_secure"
import { useUrlStore } from "@/store/useUrlStore"
import {useQuery} from "@tanstack/react-query"


export const useGetMasterInstansiOption = () => {
    const url = useUrlStore(state => state.URL.APP)
    const {data} = useQuery({
        queryFn : () => fetchData(
            `${url}/api/v1/simpeg/master/ref_instansi/options`
        ),
        queryKey : ["ref_instansi_option"]
    })

    return data
}