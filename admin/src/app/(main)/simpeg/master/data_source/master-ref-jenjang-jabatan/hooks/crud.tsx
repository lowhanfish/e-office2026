"use client";

import React from 'react'
import Swal, { SweetAlertIcon } from "sweetalert2";
import { fetchData } from '@/lib/api_secure'
import { useUrlStore } from '@/store/useUrlStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ResponseListInterface, ResponseInterface } from '../types'
import { swallAlert, showLoadingAlert } from '@/lib/show_swall';


interface ConfirmDeleteOptions {
    title?: string;
    text?: string;
    onConfirm: () => void; // Parameter fungsi yang akan dieksekusi jika diklik "Ya, hapus!"
}

export const useResponseList = (skip: number, limit: number, search: string) => {
    const url = useUrlStore(state => state.URL.APP)
    const { data: List, isLoading, isError, error } = useQuery({
        queryFn: () => fetchData<ResponseListInterface>(
            `${url}/api/v1/simpeg/master/ref_jenjang_jabatan/read?skip=${(skip - 1) * limit}&limit=${limit}&search=${search}`
        ),
        queryKey: ["master-ref_jenjang_jabatan", skip, limit, search]
    })
    return { List, isLoading, isError, error }
}

export const useDelete = () => {

    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: (id: string) => fetchData(
            `${url}/api/v1/simpeg/master/ref_jenjang_jabatan/delete/${id}`,
            {
                method: "DELETE"
            }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["master-ref_jenjang_jabatan"]
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


export const useCreate = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (body: ResponseInterface) => fetchData(
            `${url}/api/v1/simpeg/master/ref_jenjang_jabatan/create`,
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
                queryKey: ["master-ref_jenjang_jabatan"]
            });
            swallAlert("sukses ditambahkan", "success")
        },
        onError: (err: any) => {
            swallAlert(`gagal ditambahkan : ${err}`, "error")
        }
    })

    return createMutation
}


export const useUpdate = () => {
    const url = useUrlStore(state => state.URL.APP)
    const queryClient = useQueryClient()

    const updateMutation = useMutation({
        mutationFn: ({ body, id }: { body: ResponseInterface, id: string }) => fetchData(
            `${url}/api/v1/simpeg/master/ref_jenjang_jabatan/update/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["master-ref_jenjang_jabatan"] })
            swallAlert("sukses diubah", "success")
        },
        onError: (err: any) => {
            swallAlert(`gagal diubah : ${err}`, "error")
        }
    })

    return updateMutation
}

