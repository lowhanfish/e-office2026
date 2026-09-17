"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchData } from "@/lib/api_secure"
import { useUrlStore } from "@/store/useUrlStore"
import type { MasterJnsLokasiItem, MasterJnsLokasiList } from "./types"

export const useMasterJnsLokasiList = (
    debounced: string,
    pageSelect: number,
    pageLimit: number,
    search: string,
) => {
    const url = useUrlStore(state => state.URL.APP)
    const { data: List, isLoading, isError, error } = useQuery({
        queryFn: () => fetchData<MasterJnsLokasiList>(
            `${url}/api/v1/simpeg/master/ref_jns_lokasi/read?skip=${(pageSelect - 1) * pageLimit}&limit=${pageLimit}${search ? `&search=${debounced}` : ""}`,
        ),
        queryKey: ["ref_jns_lokasi", pageSelect, pageLimit, debounced],
    })

    return { List, isLoading, isError, error }
}

export const useMasterJnsLokasiDelete = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => fetchData(
            `${url}/api/v1/simpeg/master/ref_jns_lokasi/delete/${id}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            },
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ref_jns_lokasi"] })
        },
        onError: error => {
            alert(error)
        },
    })
}

export const useMasterJnsLokasiCreate = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ method, url, form }: {
            method: string
            url: string
            form: MasterJnsLokasiItem
        }) => fetchData<MasterJnsLokasiItem>(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ref_jns_lokasi"] })
        },
        onError: error => {
            alert(error)
        },
    })
}
