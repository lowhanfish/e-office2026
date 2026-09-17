import React from 'react'
import { fetchData } from '@/lib/api_secure'
import { useUrlStore } from '@/store/useUrlStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ResponseListInterface } from '../types'

interface ReadListData {
    skip: number,
    limit: number,
    search: string
}


interface FunctionOption {
    onSuccess: () => void,
    onError: () => void
}

export const useResponseListMasterAgama = (skip: number, limit: number, search: string) => {
    const url = useUrlStore(state => state.URL.APP)
    const { data: List, isLoading, isError, error } = useQuery({
        queryFn: () => fetchData<ResponseListInterface>(
            `${url}/api/v1/simpeg/master/agama/?skip=${(skip - 1) * limit}&limit=${limit}&search=${search}`
        ),
        queryKey: ["master-agama", skip, limit, search]
    })


    return { List, isLoading, isError, error }
}

export const useDeleteMasterAgama = ({ onSuccess, onError }: FunctionOption) => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: (id: string) => fetchData(
            `${url}/api/v1/simpeg/master/agama/delete/${id}`,
            {
                method: "DELETE"
            }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["master-agama"]
            })
            // alert("Sukses Menghapus Data..!")
        },
        onError: (err: any) => {
            alert(`Error : ${err}`)
        }
    })

    return deleteMutation
}


export const useCreateMasterAgama = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (body: ResponseListInterface) => fetchData(
            `${url}/api/v1/simpeg/master/agama/create`,
            {
                method: "POST",
                body: JSON.stringify(body)
            }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["master-agama"]
            });
        },
        onError: (err: any) => {
            alert(`Error : ${err}`)
        }
    })

    return createMutation
}


export const useUpdateMasterAgama = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()
}

