"use client"

import { useState, Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'


import { ResponseInterface } from "../types"
import { useCreateMaster, useUpdateMaster } from '../hooks/crud';
import { useResponseOption as useResponseOptionUnitKerja } from '../../master-ref-sub-unit-kerja/hooks/crud'
import { useResponseOption as useResponseOptionUnor } from '../hooks/crud'
import useDebounced from '@/hooks/useDebounced'
import BAutoComplete from '@/components/items/BAutoComplete'




interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: ResponseInterface,
    setForm: Dispatch<SetStateAction<ResponseInterface>>
}

const FormAdd = ({ setClose, isEdit, form, setForm }: FormCreateProps) => {

    const createMaster = useCreateMaster()
    const updateMaster = useUpdateMaster()


    const [btypeUnor, getTypeUnor] = useState<string>("")

    const searchAutoSubUnitKerja = useDebounced(form.sub_unit_kerja_nama ?? "")
    const searchAutoSubUnor = useDebounced(btypeUnor)

    const { List: ListSubUnitKerja = [] } = useResponseOptionUnitKerja(searchAutoSubUnitKerja)
    const { List: ListUnor = [] } = useResponseOptionUnor(searchAutoSubUnor)

    const setItemForm = (key: keyof ResponseInterface, value: string | number) => {
        setForm((previous) => ({
            ...previous,
            [key]: String(value)
        }))
    }

    const emptyForm = () => {
        setForm({
            id: '',
            nama: '',
            parent_id: '',
            sub_unit_kerja: '',
            sub_unit_kerja_nama: '',
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
        } else {
            createMaster.mutate(form);
            setClose(false)
        }
    }

    return (
        <div className='px-5 pb-2'>
            <div className='pt-1'>
                <BInput
                    title='Nama Unit Organisasi'
                    placeholder='Nama Unit Organisasi'
                    type='text'
                    value={form.nama}
                    onChange={(value) => {
                        setItemForm('nama', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BAutoComplete
                    title="Unit Organisasi Induk"
                    placeholder="Cari Unit Organisasi Induk..."
                    options={ListUnor}
                    getOptionLabel={(item) => item.value}
                    getOptionKey={(item) => item.id}
                    inputValue={form.parent_id_nama ?? ""}
                    onInputChange={(text) => {
                        setItemForm("parent_id_nama", text)
                    }}
                    onChange={(item) => {
                        setItemForm("parent_id", item?.id ?? "")
                    }}
                >
                    {(item) => (
                        <>
                            <span className="text-b-gray-5 font-bold">{item.value}</span>
                            <span className="text-b-gray-5 text-[10px]">{item.sub_value}</span>
                        </>
                    )}
                </BAutoComplete>
            </div>


            <div className='pt-1'>
                <BAutoComplete
                    title="Sub Unit Kerja"
                    placeholder="Cari sub unit kerja..."
                    options={ListSubUnitKerja}
                    getOptionLabel={(item) => item.value}
                    getOptionKey={(item) => item.id}
                    inputValue={form.sub_unit_kerja_nama ?? ""}
                    onInputChange={(text) => {
                        setItemForm("sub_unit_kerja_nama", text)
                    }}
                    onChange={(item) => {
                        setItemForm("sub_unit_kerja", item?.id ?? "")
                        setItemForm("sub_unit_kerja_nama", item?.value ?? "")
                    }}
                >
                    {(item) => (
                        <>
                            <span className="text-b-gray-5">{item.value}</span>
                        </>
                    )}
                </BAutoComplete>
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
