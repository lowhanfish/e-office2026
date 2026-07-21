import { useUrlStore } from "@/store/useUrlStore";
import { useQuery } from "@tanstack/react-query";
import {JenisInstansiResponse, JenisInstansi, JenisInstansiOption} from "./types"
import { callAPI } from "@/lib/api";

export const useGetAllJenisInstansi = () => {

    const url = useUrlStore(state => state.URL.APP);
    const {data = [], isLoading, isError, error} = useQuery({
        queryFn : () => callAPI<JenisInstansiResponse>(`${url}/api/v1/simpeg/master/ref_jenis_instansi/read`),
        queryKey : ["ref_jenis_instansi_all"]
    });

    const List:JenisInstansiOption[] = data.map((item:JenisInstansi)=>({
        id: item.kode,
        value: item.nama,
    }));

    return {
        List : List,
        isLoading : isLoading,
        isError : isError,
        error : error
    };
}

