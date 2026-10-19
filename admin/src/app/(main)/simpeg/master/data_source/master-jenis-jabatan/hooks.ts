"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "@/lib/api_secure";
import { useUrlStore } from "@/store/useUrlStore";
import type { MasterResponse, MasterResponseList } from "./types";
import { ListOptionSchema } from "@/types/global";

interface ResponseInterface {
  id: string;
  value: string;
  sub_value?: string;
}

export const useMasterJnsJabatanOption = () => {
  const url = useUrlStore((state) => state.URL.APP);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () =>
      fetchData(`
            ${url}/api/v1/simpeg/master/ref_jns_jabatan/option
        `),
    queryKey: ["ref_jns_jabatan"],
  });

  let result: ListOptionSchema = [];
  if (data) {
    result = (data as ResponseInterface[])?.map((item: any) => ({
      id: item.kode,
      value: item.nama,
    }));
  }

  return {
    List: result,
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};

export const useMasterJnsJabatanList = (
  debounced: string,
  pageSelect: number,
  pageLimit: number,
  search: string,
) => {
  const url = useUrlStore((state) => state.URL.APP);
  const {
    data: List,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () =>
      fetchData<MasterResponseList>(
        `${url}/api/v1/simpeg/master/ref_jns_jabatan/read?skip=${(pageSelect - 1) * pageLimit}&limit=${pageLimit}${search ? `&search=${debounced}` : ""}`,
      ),
    queryKey: ["ref_jns_jabatan", pageSelect, pageLimit, debounced],
  });

  return { List, isLoading, isError, error };
};

export const useMasterJnsJabatanDelete = () => {
  const url = useUrlStore((state) => state.URL.APP);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetchData(`${url}/api/v1/simpeg/master/ref_jns_jabatan/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ref_jns_jabatan"] });
    },
    onError: (error) => {
      alert(error);
    },
  });
};

export const useMasterJnsJabatanCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      method,
      url,
      form,
    }: {
      method: string;
      url: string;
      form: MasterResponse;
    }) =>
      fetchData<MasterResponse>(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ref_jns_jabatan"] });
    },
    onError: (error) => {
      alert(error);
    },
  });
};
