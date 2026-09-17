"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchData } from "@/lib/api_secure"
import { useUrlStore } from "@/store/useUrlStore"
import type {
    MasterInstansiOptionItem,
    MasterSatkerCreate,
    MasterSatkerList,
} from "./types"

export const useGetMasterInstansiOption = () => {
    const url = useUrlStore(state => state.URL.APP)
    const { data } = useQuery({
        queryFn: () => fetchData<MasterInstansiOptionItem[]>(
            `${url}/api/v1/simpeg/master/ref_instansi/options`,
        ),
        queryKey: ["ref_instansi_option"],
    })

    return data?.map(item => ({
        id: item.kode,
        value: item.nama,
    }))
}

export const useGetMasterSatker = (
    pageSelect: number,
    pageLimit: number,
    search: string,
    debounced: string,
) => {
    const url = useUrlStore(state => state.URL.APP)
    const { data: List, isLoading, isError, error } = useQuery({
        queryFn: () => fetchData<MasterSatkerList>(
            `${url}/api/v1/simpeg/master/ref_satker/read?skip=${(pageSelect - 1) * pageLimit}&limit=${pageLimit}${search ? `&search=${debounced}` : ""}`,
        ),
        queryKey: ["ref_satker", pageSelect, pageLimit, debounced],
    })

    return { List, isLoading, isError, error }
}

export const useCreateMasterSatker = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ newUrl, newForm, method }: {
            newUrl: string
            newForm: MasterSatkerCreate
            method: string
        }) => fetchData(newUrl, {
            headers: { "Content-Type": "application/json" },
            method,
            body: JSON.stringify(newForm),
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ref_satker"] })
        },
        onError: error => {
            alert(error)
        },
    })
}

export const useDeleteMasterSatker = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => fetchData(
            `${url}/api/v1/simpeg/master/ref_satker/delete/${id}`,
            {
                headers: { "Content-Type": "application/json" },
                method: "DELETE",
            },
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ref_satker"] })
        },
        onError: error => {
            alert(error)
        },
    })
}
