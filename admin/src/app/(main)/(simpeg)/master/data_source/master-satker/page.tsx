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
import { listindex } from "@/utilities/pagination"
import { BSkeletonTable } from '@/components/items/BSkeleton';

import { useQueryClient, useMutation } from "@tanstack/react-query"
import useDebounced from '@/hooks/useDebounced';
import useForm from '@/hooks/useForm';
import { useDeleteMasterSatker, useGetMasterSatker } from '@/features/simpeg/master/data-source/master-satker/hooks';

import { masterSatkerItem, masterSatkerList, masterSatkerCreate } from "@/features/simpeg/master/data-source/master-satker/types"

const Page = () => {

    const queryClient = useQueryClient()
    const { mutate, isPending } = useDeleteMasterSatker()

    const url = useUrlStore(state => state.URL.APP)

    const DataShow = useUrlStore(state => state.DataShow)
    const [open, setOpen] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [createType, setCreateType] = useState(false)
    const [pageSelect, setPageSelect] = useState<number>(1);
    const [pageLimit, setPageLimit] = useState<number>(8)

    // PERBAIKAN DEBOUNCE STATE
    const [search, setSearch] = useState<string>("") // State instan untuk input
    const debounced = useDebounced(search)

    const { form, setForm, setItemForm, emptyForm } = useForm<masterSatkerItem>({
        id: '',
        kode: '',
        nama: '',
        instansi_id: "",
        created_by: "user.id"
    })

    const selectItem = (item: masterSatkerItem) => {
        setForm({
            id: item.id,
            kode: item.kode,
            nama: item.nama,
            instansi_id: item.instansi_id,
            created_by: item.created_by
        })
    }

    const { List, isLoading, isError, error } = useGetMasterSatker(
        pageSelect,
        pageLimit,
        search,
        debounced
    );


    const btnDelete = (id: string) => {
        // deleteDataMutation.mutate(id)
        mutate(id)
    }

    useEffect(() => {
        setPageSelect(1)
    }, [debounced])

    return (
        <div>
            <TextSeparate title='Master Satker' />
            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>
                    <div className='col-span-6 '>
                        <div className='text-[12px] text-b-gray-3 pl-2'>Cari Data</div>
                        <div className='flex gap-1 relative'>
                            {/* PERBAIKAN INPUT: Mengikat value dan onChange langsung ke state 'search' */}
                            <BInput
                                placeholder='Cari Data...'
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
                                    <th className='w-[30%]'>Instansi</th>
                                    <th className='w-[50%]'>Nama Satker</th>
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
                                        <td><p className='text-center'>{item.kode}</p></td>
                                        <td className=''><p>{item.nama}</p></td>
                                        <td className=''><p className=''>{item.instansi_nama}</p></td>
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

                <BModal title={`${createType ? 'Edit' : 'Add'} Data`} openModal={modalCreate} setOpenModal={setModalCreate} size='md'>
                    <FormCreate
                        setClose={setModalCreate}
                        isEdit={createType}
                        form={form}
                        setForm={setForm}
                        setItemForm={setItemForm}
                        emptyForm={emptyForm}
                    />
                </BModal>
            </div>
        </div>
    )
}

export default Page