"use client"

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'

import { CreateInterface, ResponseInterface, ResponseListInterface } from "../types"
import { useCreateMaster, useUpdateMaster } from '../hooks/crud';

import BInputAutocomplete from '@/components/items/BInputAutoComplete'
import { useResponseOption as useResponseOptionRumpunJabatan } from '../../master-ref-rumpun-jabatan/hooks/crud';

interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: ResponseInterface,
    setForm: Dispatch<SetStateAction<ResponseInterface>>
}

const FormAdd = ({ setClose, isEdit, form, setForm }: FormCreateProps) => {

    const createMaster = useCreateMaster()
    const updateMaster = useUpdateMaster()


    const { List: responseOptionRumpunJabatan } = useResponseOptionRumpunJabatan("")
    const [listRumpunJabatan, setListRumpunJabatan] = useState()

    const [data, setData] = useState<string | number>("")
    const [btype, getType] = useState<string | number>("")

    const setItemForm = (key: keyof ResponseInterface, value: string | number) => {
        setForm({
            ...form,
            [key]: String(value)
        })
    }

    const emptyForm = () => {
        setForm({
            id: '',
            kode: '',
            nama: '',
            created_by: "user.id",
            created_at: "user.id",
        })
        setClose(false)
    }

    const submit = () => {
        if (isEdit) {
            updateMaster.mutate({
                body: form,
                id: form.id
            })
            setClose(false)
            // console.log(form)
        } else {
            // console.log(form)
            createMaster.mutate(form);
            setClose(false)
        }
    }

    useEffect(() => {
        setItemForm("kode_rumpun", data as string)
    }, [data])

    return (
        <div className='px-5 pb-2'>
            <div className='pt-1'>
                <BInputAutocomplete
                    title="Kode Cepat Rumpun Jabatan"
                    placeholder="Cari data Ref Rumpun Jabatan"
                    DataObj={responseOptionRumpunJabatan}
                    BSetValue={setData}
                    BGetText={getType}
                    BKey="id"
                    label="value"
                />

                {/* <p>{data}</p> */}
            </div>
            <div className='pt-1'>
                <BInput
                    title='Kode Ref Rumpun Jabatan JF (Id pada SIASN)'
                    placeholder='Kode Ref Rumpun Jabatan JF'
                    type='text'
                    value={form.kode}
                    onChange={(value) => {
                        setItemForm('kode', value)
                    }}
                />
            </div>

            <div className='pt-1'>
                <BInput
                    title='Nama Ref Rumpun Jabatan JF'
                    placeholder='Nama Ref Rumpun Jabatan JF'
                    type='text'
                    value={form.nama}
                    onChange={(value) => {
                        setItemForm('nama', value)
                    }}
                />
            </div>

            <div className='flex gap-2 justify-end mt-3 py-2 border-y border-b-gray-2'>
                <div className='w-30'>
                    {
                        isEdit ? (
                            <BButton
                                color='yellow'
                                size='sm'
                                onClick={submit}
                            >
                                <p className='text-b-gray-6 text-[13px]'>Edit</p>
                            </BButton>
                        ) : (
                            <BButton
                                color='blue'
                                size='sm'
                                onClick={submit}
                            >
                                <p className='text-b-gray-6 text-[13px]'>Save</p>
                            </BButton>
                        )
                    }

                </div>
                <div className='w-30'>
                    <BButton
                        color='red'
                        size='sm'
                        onClick={() => { setClose(false); emptyForm() }}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Cancel</p>
                    </BButton>
                </div>
            </div>

        </div>
    )
}

export default FormAdd