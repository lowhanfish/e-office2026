"use client"

import { useState } from 'react'
import { BsGear } from 'react-icons/bs'

import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import BInputSelect from '@/components/items/BInputSelect'
import BModal from '@/components/items/BModal'
import BPagination from '@/components/items/BPagination'
import { BSkeletonTable } from '@/components/items/BSkeleton'
import TextSeparate from '@/components/items/TextSeparate'
import useDebounced from '@/hooks/useDebounced'
import { useUrlStore } from '@/store/useUrlStore'
import { listindex } from '@/utilities/pagination'
import FormCreate from './components/FormCreate'
import { useDeleteRefLokasi, useRefLokasiList } from './hooks'
import type { RefLokasiItem } from './types'

const emptyForm: RefLokasiItem = {
    id: '',
    kode: '',
    nama: '',
    kanreg_id: '',
    ref_lokasi_id: '',
    kode_cepat: '',
    ref_jns_lokasi_id: '',
}

const Page = () => {
    const dataShow = useUrlStore(state => state.DataShow)
    const { data = [], isLoading, isError, error } = useRefLokasiList()
    const deleteMutation = useDeleteRefLokasi()

    const [open, setOpen] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [pageSelect, setPageSelect] = useState(1)
    const [pageLimit, setPageLimit] = useState(8)
    const [search, setSearch] = useState('')
    const [form, setForm] = useState<RefLokasiItem>(emptyForm)
    const debouncedSearch = useDebounced(search)

    const normalizedSearch = debouncedSearch.toLowerCase()
    const filteredData = data.filter(item =>
        item.nama.toLowerCase().includes(normalizedSearch) ||
        item.kode.toLowerCase().includes(normalizedSearch) ||
        item.kode_cepat.toLowerCase().includes(normalizedSearch) ||
        item.kanreg_id.toLowerCase().includes(normalizedSearch)
    )
    const visibleData = filteredData.slice((pageSelect - 1) * pageLimit, pageSelect * pageLimit)

    const openAddModal = () => {
        setForm(emptyForm)
        setIsEdit(false)
        setModalCreate(true)
    }

    const openActionModal = (item: RefLokasiItem) => {
        setForm(item)
        setOpen(true)
    }

    return (
        <div>
            <TextSeparate title='Master Referensi Lokasi' />

            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>
                    <div className='col-span-6'>
                        <div className='text-[12px] text-b-gray-3 pl-2'>Cari Data</div>
                        <div className='flex gap-1 relative'>
                            <BInput
                                placeholder='Cari referensi lokasi...'
                                type='text'
                                value={search}
                                onChange={value => {
                                    setSearch(String(value))
                                    setPageSelect(1)
                                }}
                            />
                            <div className='w-12'>
                                <BButton color='blue' size='md' onClick={openAddModal}>
                                    <p className='text-b-gray-6 text-[12px]'>+</p>
                                </BButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                {isLoading ? (
                    <BSkeletonTable limit={pageLimit} />
                ) : isError ? (
                    <p className='p-3 text-sm text-b-red-5'>{error.message}</p>
                ) : (
                    <table className='Btable w-full'>
                        <thead>
                            <tr className='text-left'>
                                <th className='w-[5%] text-center'>No</th>
                                <th className='w-[5%] text-center'>Act</th>
                                <th className='w-[10%] text-center'>Kode</th>
                                <th className='w-[15%]'>Kode Cepat</th>
                                <th className='w-[45%]'>Nama</th>
                                <th className='w-[20%]'>Kanreg</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleData.map((item, index) => (
                                <tr key={item.id} className='poppins'>
                                    <td><p className='text-center'>{listindex(pageLimit, pageSelect, index)}</p></td>
                                    <td>
                                        <div className='flex justify-center'>
                                            <button
                                                onClick={() => openActionModal(item)}
                                                className='bg-b-gray-2/80 hover:bg-b-gray-2/50 flex justify-center items-center rounded-full w-6 h-6 cursor-pointer'
                                            >
                                                <BsGear className='text-b-gray-6' />
                                            </button>
                                        </div>
                                    </td>
                                    <td><p className='text-center'>{item.kode}</p></td>
                                    <td><p>{item.kode_cepat}</p></td>
                                    <td><p>{item.nama}</p></td>
                                    <td><p>{item.kanreg_id}</p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-2 md:gap-y-10 w-full'>
                    <div className='col-span-12 md:col-span-9 flex flex-col md:flex-row gap-2'>
                        <BPagination
                            pageSelect={pageSelect}
                            setPageSelect={setPageSelect}
                            pageLimit={pageLimit}
                            pageShow={4}
                            dataLength={filteredData.length}
                            onClick={() => {}}
                        />
                    </div>
                    <div className='col-span-12 md:col-span-3 flex justify-center md:justify-end'>
                        <BInputSelect
                            onChange={value => {
                                setPageLimit(Number(value))
                                setPageSelect(1)
                            }}
                            options={dataShow}
                            datavalue={pageLimit}
                        />
                    </div>
                </div>
            </div>

            <BModal title='Configuration' openModal={open} setOpenModal={setOpen} size='xs'>
                <div className='flex flex-col gap-2 p-4'>
                    <button
                        className='bg-b-yellow-4 hover:bg-b-yellow-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'
                        onClick={() => {
                            setOpen(false)
                            setIsEdit(true)
                            setModalCreate(true)
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className='bg-b-red-4 hover:bg-b-red-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'
                        onClick={() => {
                            setOpen(false)
                            deleteMutation.mutate(form.id)
                        }}
                    >
                        Delete
                    </button>
                </div>
            </BModal>

            <BModal title={`${isEdit ? 'Edit' : 'Add'} Data`} openModal={modalCreate} setOpenModal={setModalCreate} size='md'>
                <FormCreate
                    setClose={setModalCreate}
                    isEdit={isEdit}
                    form={form}
                    setForm={setForm}
                    parentLocations={data}
                />
            </BModal>
        </div>
    )
}

export default Page
