"use client"

import { useState, useEffect } from 'react'
import BInput from '@/components/items/BInput'
import TextSeparate from '@/components/items/TextSeparate';
import { BsGear } from "react-icons/bs";
import BModal from '@/components/items/BModal';
import BButton from '@/components/items/BButton';
import BPagination from '@/components/items/BPagination';
import BInputSelect from '@/components/items/BInputSelect';
import { useUrlStore } from "@/store/useUrlStore"
import FormCreate from './components/FormCreate';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { listindex } from "@/utilities/pagination"
import { BSkeletonTable } from '@/components/items/BSkeleton';

interface FormData {
    id: string,
    kode: string,
    nama: string,
    created_by: string
}

interface FormResponse {
    id: string,
    kode: string,
    nama: string,
    created_by: string,
    created_at: string
}

interface FormResponseList {
    total: number,
    skip: number,
    limit: number,
    data: FormResponse[]
}

const readData = async (url: string): Promise<FormResponseList> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Gagal mengambil data dari server")
    return res.json()
}

const deleteData = async (url: string) => {
    const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    if (!res.ok) throw new Error("Gagal Menghapus Data")
    return res.json()
}

const InputData = () => {
    const queryClient = useQueryClient()
    const url = useUrlStore(state => state.URL.APP)
    const DataShow = useUrlStore(state => state.DataShow)

    const [open, setOpen] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [createType, setCreateType] = useState(false)
    const [pageSelect, setPageSelect] = useState<number>(1);
    const [pageLimit, setPageLimit] = useState<number>(8)

    // PERBAIKAN DEBOUNCE STATE
    const [search, setSearch] = useState<string>("") // State instan untuk input
    const [debouncedSearch, setDebouncedSearch] = useState<string>("") // State tunda untuk fetch API

    const [form, setForm] = useState<FormData>({
        id: '',
        kode: '',
        nama: '',
        created_by: "user.id"
    })

    const selectItem = (item: FormResponse) => {
        setForm({
            id: item.id,
            kode: item.kode,
            nama: item.nama,
            created_by: item.created_by
        })
    }

    // PERBAIKAN LOGIKA DEBOUNCE MANUAL
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPageSelect(1); // Reset halaman ke 1 sewaktu user mencari kata kunci baru
        }, 500); // Toleransi waktu tunggu: 500ms

        return () => {
            clearTimeout(handler); // Hancurkan timer jika user mengetik lagi sebelum 500ms selesai
        };
    }, [search]);

    const { data: List, isLoading, isError, error } = useQuery({
        queryFn: () => readData(`${url}/api/v1/simpeg/master/ref_jns_pegawai/read?skip=${((pageSelect - 1) * pageLimit)}&limit=${pageLimit}&search=${debouncedSearch}`),
        queryKey: ['ref_jns_pegawai', pageSelect, pageLimit, debouncedSearch]
    })

    const deleteDataMutation = useMutation({
        mutationFn: (idx: string) => deleteData(
            `${url}/api/v1/simpeg/master/ref_jns_pegawai/delete/${idx}`
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ref_jns_pegawai'] });
        },
        onError: (err: any) => {
            alert(`Error : ${err}`)
        }
    })

    const btnDelete = (idx: string) => {
        deleteDataMutation.mutate(idx)
    }

    return (
        <div>
            <TextSeparate title='Master Jenis Pegawai' />
            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>
                    <div className='col-span-6 '>
                        <div className='text-[12px] text-b-gray-3 pl-2'>Cari Data</div>
                        <div className='flex gap-1 relative'>
                            {/* PERBAIKAN INPUT: Mengikat value dan onChange langsung ke state 'search' */}
                            <BInput
                                placeholder='Cari Data Golongan...'
                                type='text'
                                value={search}
                                onChange={(value) => {
                                    setSearch(value as string)
                                }}
                            />
                            <div className='w-12'>
                                <BButton
                                    color='blue'
                                    size='md'
                                    onClick={() => { setModalCreate(true); setCreateType(false) }}
                                >
                                    <p className='text-b-gray-6 text-[12px]'>+</p>
                                </BButton>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-6 '>
                    </div>
                </div>
            </div>

            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                {
                    isLoading ? (
                        <BSkeletonTable limit={pageLimit} />
                    ) : (
                        <table className='Btable w-full'>
                            <thead>
                                <tr className="text-left">
                                    <th className='w-[5%] text-center'>No</th>
                                    <th className='w-[5%] text-center'>Act</th>
                                    <th className='w-[10%] text-center'>Kode</th>
                                    <th className='w-[80%]'>Nama</th>
                                </tr>
                            </thead>

                            <tbody>
                                {List?.data.map((item, index) => (
                                    <tr key={index} className='poppins'>
                                        <td className=''>
                                            <p className='text-center'>{listindex(pageLimit, pageSelect, index)}</p>
                                        </td>
                                        <td className=''>
                                            <div className='flex justify-center'>
                                                <button onClick={() => { selectItem(item); setOpen(!open) }} className='bg-b-gray-2/80 hover:bg-b-gray-2/50 flex justify-center items-center rounded-full w-6 h-6 cursor-pointer'>
                                                    <BsGear className='text-b-gray-6' />
                                                </button>
                                            </div>
                                        </td>
                                        <td className=''><p className='text-center'>{item.kode}</p></td>
                                        <td className=''><p>{item.nama}</p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </div>

            <div>
                <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                    <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-2 md:gap-y-10 w-full'>
                        <div className='col-span-12 md:col-span-9 flex flex-col md:flex-row  gap-2'>
                            <BPagination
                                pageSelect={pageSelect}
                                setPageSelect={setPageSelect}
                                pageLimit={pageLimit}
                                pageShow={4}
                                dataLength={List?.total ?? 0}
                                onClick={(page) => { console.log(page) }}
                            />
                        </div>

                        <div className='col-span-12 md:col-span-3 flex justify-center md:justify-end'>
                            <BInputSelect
                                onChange={(value) => {
                                    setPageLimit(Number(value))
                                }}
                                options={DataShow}
                                datavalue={pageLimit}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <BModal title='Configuration' openModal={open} setOpenModal={setOpen} size='xs'>
                    <div className='flex flex-col gap-2 p-4'>
                        <button className='bg-b-blue-4 hover:bg-b-blue-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'
                            onClick={() => { }}
                        >
                            Detail
                        </button>
                        <button className='bg-b-yellow-4 hover:bg-b-yellow-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'
                            onClick={() => { setOpen(!open); setModalCreate(true); setCreateType(true) }}
                        >
                            Edit
                        </button>
                        <button className='bg-b-red-4 hover:bg-b-red-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'
                            onClick={() => { setOpen(!open); btnDelete(form.id) }}
                        >
                            Delete
                        </button>
                    </div>
                </BModal>

                <BModal title={`${createType ? 'Edit' : 'Add'} Data`} openModal={modalCreate} setOpenModal={setModalCreate} size='sm'>
                    <FormCreate setClose={setModalCreate} isEdit={createType} form={form} setForm={setForm} />
                </BModal>
            </div>
        </div>
    )
}

export default InputData