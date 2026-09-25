import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import BInputSelect from '@/components/items/BInputSelect'

import { ResponseInterface } from "../types"
import { ListOptionSchema } from '@/types/global'
import { useCreate, useUpdate } from '../hooks/crud';
import { useResponseOption as useListRefLevelKompetensi } from '../../master-ref-level-kompetensi-asn/hooks/crud'
import { useOptionMaster as useListRefAsnJenisJabatan } from '../../master-ref-asn-jenis-jabatan/hooks/crud'


interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: ResponseInterface,
    setForm: Dispatch<SetStateAction<ResponseInterface>>,
    emptyForm: () => void
}

const FormAdd = ({ setClose, isEdit, form, setForm, emptyForm }: FormCreateProps) => {

    const createMasterAgama = useCreate()
    const updateMasterAgama = useUpdate()

    const setItemForm = (key: keyof ResponseInterface, value: string | number) => {
        setForm({
            ...form,
            [key]: String(value)
        })
    }
    const { List: ListRefLevelKompetensi } = useListRefLevelKompetensi();
    const { List: ListRefAsnJenisJabatan } = useListRefAsnJenisJabatan();

    const submit = () => {
        if (isEdit) {
            updateMasterAgama.mutate({
                body: form,
                id: form.id
            })
            setClose(false)
        } else {
            createMasterAgama.mutate(form);
            setClose(false)
        }
    }

    return (
        <div className='px-5 pb-2'>
            <div className='pt-1'>
                <BInput
                    title='Kode Ref Jenjang Jabatan (Id pada SIASN)'
                    placeholder='Kode Ref Jenjang Jabatan'
                    type='text'
                    value={form.kode}
                    onChange={(value) => {
                        setItemForm('kode', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInput
                    title='Nama Ref Jenjang Jabatan'
                    placeholder='Nama Ref Jenjang Jabatan'
                    type='text'
                    value={form.nama}
                    onChange={(value) => {
                        setItemForm('nama', value)
                    }}
                />
            </div>

            <div className='pt-1'>
                <BInputSelect
                    title='ASN Jenis Jabatan Id'
                    options={ListRefAsnJenisJabatan as ListOptionSchema}
                    datavalue={form.asn_jenis_jabatan_id}
                    onChange={(value) => {
                        setItemForm('asn_jenis_jabatan_id', value)
                    }}
                />
            </div>

            <div className='pt-1'>
                <BInputSelect
                    title='Level Kompetensi Jabatan'
                    options={ListRefLevelKompetensi as ListOptionSchema}
                    datavalue={form.level_kompetensi_jabatan}
                    onChange={(value) => {
                        console.log(value)
                        setItemForm('level_kompetensi_jabatan', value)
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
