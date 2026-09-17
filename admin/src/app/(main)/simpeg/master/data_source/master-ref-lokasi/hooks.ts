"use client"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { fetchData } from '@/lib/api_secure'
import { useUrlStore } from '@/store/useUrlStore'
import type {
    RefJnsLokasiList,
    RefLokasiItem,
    RefLokasiReadResponse,
    SelectOption,
} from './types'

const queryKey = ['ref_lokasi'] as const

export const useRefLokasiList = () => {
    const apiUrl = useUrlStore(state => state.URL.APP)

    return useQuery({
        queryKey,
        queryFn: async () => {
            const response = await fetchData<RefLokasiReadResponse>(
                `${apiUrl}/api/v1/simpeg/master/ref_lokasi/read`,
            )
            const items = Array.isArray(response) ? response : response.data

            return items.map(item => ({
                ...item,
                kode: item.kode ?? '',
                nama: item.nama ?? '',
                kanreg_id: item.kanreg_id ?? '',
                kode_cepat: item.kode_cepat ?? '',
                ref_jns_lokasi_id: item.ref_jns_lokasi_id ?? '',
            }))
        },
    })
}

export const useRefJnsLokasiOptions = () => {
    const apiUrl = useUrlStore(state => state.URL.APP)
    const { data } = useQuery({
        queryKey: ['ref_jns_lokasi', 'options'],
        queryFn: () => fetchData<RefJnsLokasiList>(
            `${apiUrl}/api/v1/simpeg/master/ref_jns_lokasi/read?skip=0&limit=1000`,
        ),
    })

    return (data?.data ?? []).map<SelectOption>(item => ({
        id: item.kode,
        value: `${item.kode} - ${item.nama}`,
    }))
}

export const useSaveRefLokasi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ url, method, form }: {
            url: string
            method: 'POST' | 'PUT'
            form: RefLokasiItem
        }) => fetchData<RefLokasiItem>(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                kode: form.kode,
                nama: form.nama,
                kanreg_id: form.kanreg_id,
                ref_lokasi_id: form.ref_lokasi_id || null,
                kode_cepat: form.kode_cepat,
                ref_jns_lokasi_id: form.ref_jns_lokasi_id,
            }),
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey })
        },
    })
}

export const useDeleteRefLokasi = () => {
    const apiUrl = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => fetchData(
            `${apiUrl}/api/v1/simpeg/master/ref_lokasi/delete/${id}`,
            { method: 'DELETE' },
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey })
        },
    })
}
