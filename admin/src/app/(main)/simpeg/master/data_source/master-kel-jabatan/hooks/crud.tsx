"use client";

import React from 'react'
import { fetchData } from '@/lib/api_secure'
import { useUrlStore } from '@/store/useUrlStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ResponseListInterface, ResponseInterface } from '../types'
import { swallAlert, showLoadingAlert } from '@/lib/show_swall';
import { ListOptionSchema } from '@/types/global'


export const useResponseOption = () => {
    const url = useUrlStore(state => state.URL.APP)
    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchData(`
            ${url}/api/v1/simpeg/master/ref_jns_jabatan_umum/option
        `),
        queryKey: ["master-jenis-jabatan-umum-option"]
    })

    let result: ListOptionSchema = []
    if (data) {
        result = (data as ResponseInterface[])?.map((item: any) => ({
            id: item.kode,
            value: item.nama
        }))
    }


    return {
        List: result,
        isLoading: isLoading,
        isError: isError,
        error: error
    }
}

export const useResponseListMaster = (skip: number, limit: number, search: string) => {
    const url = useUrlStore(state => state.URL.APP)
    const { data: List, isLoading, isError, error } = useQuery({
        queryFn: () => fetchData<ResponseListInterface>(
            `${url}/api/v1/simpeg/master/ref_jns_jabatan_umum/read/?skip=${(skip - 1) * limit}&limit=${limit}&search=${search}`
        ),
        queryKey: ["master-jenis-jabatan-umum", skip, limit, search]
    })
    return { List, isLoading, isError, error }
}

export const useDeleteMaster = () => {

    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: (id: string) => fetchData(
            `${url}/api/v1/simpeg/master/ref_jns_jabatan_umum/delete/${id}`,
            {
                method: "DELETE"
            }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["master-jenis-jabatan-umum"]
            })
            swallAlert("sukses dihapus", "success")
        },
        onError: (err: any) => {
            swallAlert("gagal dihapus", "error")
        }
    })

    if (deleteMutation.isPending) {
        showLoadingAlert()
    }
    return deleteMutation
}


export const useCreateMaster = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (body: ResponseInterface) => fetchData(
            `${url}/api/v1/simpeg/master/ref_jns_jabatan_umum/create`,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["master-jenis-jabatan-umum"]
            });
            swallAlert("sukses ditambahkan", "success")
        },
        onError: (err: any) => {
            swallAlert(`gagal ditambahkan : ${err}`, "error")
        }
    })

    return createMutation
}


export const useUpdateMaster = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()

    const updateMutation = useMutation({
        mutationFn: ({ body, id }: { body: ResponseInterface, id: string }) => fetchData(
            `${url}/api/v1/simpeg/master/ref_jns_jabatan_umum/update/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["master-jenis-jabatan-umum"] })
            swallAlert("sukses diubah", "success")
        },
        onError: (err: any) => {
            swallAlert(`gagal diubah : ${err}`, "error")
        }
    })

    return updateMutation
}

