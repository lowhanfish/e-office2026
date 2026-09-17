"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchData } from "@/lib/api_secure"
import { useUrlStore } from "@/store/useUrlStore"
import type {
    JenisInstansi,
    JenisInstansiResponse,
    RefJenisInstansiIdItem,
    RefJenisInstansiIdResponse,
    SelectOption,
} from "./types"

export const useGetAllJenisInstansi = () => {
    const url = useUrlStore(state => state.URL.APP)
    const { data = [], isLoading, isError, error } = useQuery({
        queryFn: () => fetchData<JenisInstansiResponse>(
            `${url}/api/v1/simpeg/master/ref_jenis_instansi/read`,
        ),
        queryKey: ["ref_jenis_instansi_all"],
    })

    const List: SelectOption[] = data.map((item: JenisInstansi) => ({
        id: item.kode,
        value: item.nama,
    }))

    return { List, isLoading, isError, error }
}

export const useGetRefJenisInstansiIdAll = () => {
    const url = useUrlStore(state => state.URL.APP)
    const { data = [], isLoading, isError, error } = useQuery({
        queryFn: () => fetchData<RefJenisInstansiIdResponse>(
            `${url}/api/v1/simpeg/master/ref_jenis_instansi_id/read`,
        ),
        queryKey: ["ref_jenis_instansi_id_all"],
    })

    const List: SelectOption[] = data.map((item: RefJenisInstansiIdItem) => ({
        id: item.kode,
        value: item.nama,
    }))

    return { List, isLoading, isError, error }
}
