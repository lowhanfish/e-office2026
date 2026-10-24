import { Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import BInputSelect from '@/components/items/BInputSelect'

import { ResponseInterface } from "../types"
import { useCreateMaster, useUpdateMaster } from '../hooks/crud';


import { useResponseOption as useResponseOptionJenjangJabfung } from "../../master-ref-jenjang-jabatan-fungsional/hooks/crud"
import { useResponseOption as useResponseOptionKelJabatan } from "../../master-kel-jabatan/hooks/crud"


import BAutoComplete from '@/components/items/BAutoComplete'

import { StatusJabfung } from "@/constants/instansi"

interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: ResponseInterface,
    setForm: Dispatch<SetStateAction<ResponseInterface>>
}

const FormAdd = ({ setClose, isEdit, form, setForm }: FormCreateProps) => {

    const createMaster = useCreateMaster()
    const updateMaster = useUpdateMaster()

    const listStatusJabfung = StatusJabfung
    const { List: listJenjang } = useResponseOptionJenjangJabfung()
    const { List: listKelJabatan } = useResponseOptionKelJabatan(form.ref_kel_jabatan_nama)

    const setItemForm = (key: keyof ResponseInterface, value: string | number) => {
        setForm((prev) => ({
            ...prev,
            [key]: String(value)
        }))
    }

    const emptyForm = () => {
        setForm({
            id: '',
            kode: '',
            nama: '',
            kode_cepat: '',
            bup_usia: 0,
            ref_kel_jabatan_id: '',
            jenjang: '',
            status: '',
            ref_kel_jabatan_nama: '',
            jenjang_nama: '',
            created_by: "",
            created_at: "",
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
            <div className='pt-1 flex gap-2'>
                <BInput
                    title='Kode Jabfung (Id pada SIASN)'
                    placeholder='Kode Jabfung'
                    type='text'
                    value={form.kode}
                    onChange={(value) => {
                        setItemForm('kode', value)
                    }}
                />
                <BInput
                    title='Kode Cepat Jabfung (Id pada SIASN)'
                    placeholder='Kode Cepat Jabfung'
                    type='text'
                    value={form.kode_cepat}
                    onChange={(value) => {
                        setItemForm('kode_cepat', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInput
                    title='Nama Ref Jabfung'
                    placeholder='Nama Ref Jabfung'
                    type='text'
                    value={form.nama}
                    onChange={(value) => {
                        setItemForm('nama', value)
                    }}
                />
            </div>
            <div className='pt-1 flex gap-2'>
                <BInputSelect
                    title='Status Jabfung'
                    datavalue={form.status}
                    options={listStatusJabfung}
                    onChange={(value) => {
                        console.log(value)
                        setItemForm('status', value)
                    }}
                />

                <BInput
                    title='Batas Usia Pensiun'
                    placeholder='BUP'
                    type='number'
                    value={form.bup_usia}
                    onChange={(value) => {
                        setItemForm('bup_usia', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BAutoComplete
                    title="Jenjang Jabfung"
                    placeholder="Cari Jenjang Jabfung..."
                    options={listJenjang}
                    getOptionLabel={(item) => item.value}
                    getOptionKey={(item) => item.id}
                    inputValue={form.jenjang_nama ?? ""}
                    onInputChange={(text) => {
                        setItemForm("jenjang_nama", text)
                    }}
                    onChange={(item) => {
                        setItemForm("jenjang", item?.id ?? "")
                    }}
                >
                    {(item) => (
                        <>
                            <span className="text-b-gray-5 font-bold">[{item.id}]-{item.value}</span>
                        </>
                    )}
                </BAutoComplete>
            </div>

            <div className='pt-1'>
                <BAutoComplete
                    title="Kel Jabatan"
                    placeholder="Cari Kel Jabatan..."
                    options={listKelJabatan}
                    getOptionLabel={(item) => item.value}
                    getOptionKey={(item) => item.id}
                    inputValue={form.ref_kel_jabatan_nama ?? ""}
                    onInputChange={(text) => {
                        setItemForm("ref_kel_jabatan_nama", text)
                    }}
                    onChange={(item) => {
                        setItemForm("ref_kel_jabatan_id", item?.id ?? "")
                    }}
                >
                    {(item) => (
                        <>
                            <span className="text-b-gray-5 font-bold">{item.value}</span>
                            <span className="text-b-gray-5 text-[11px]">{item.sub_value}</span>
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
