import { Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import BInputSelect from '@/components/items/BInputSelect'

import { ResponseInterface } from "../types"
import { useCreateMaster, useUpdateMaster } from '../hooks/crud';

import { useMasterJnsJabatanOption } from "../../master-jenis-jabatan/hooks"
import { useResponseOption as useListRumpunJabatanJf } from "../../master-ref-rumpun-jabatan-jf/hooks/crud"
import { useResponseOption as useListInstansi } from "../../master-instansi/hooks"

import BAutoComplete from '@/components/items/BAutoComplete'

const dataArrObj = [
    { id: 1, name: 'Kiken S batara, S.Si.,MT', role: 'Fullstack AI Engineer' },
    { id: 2, name: 'Riswan M Rizal. ST', role: 'Fullstack AI Engineer' },
    { id: 3, name: 'Muh. Hidayat Dermawan. ST', role: 'Fullstack AI Engineer' },
]

interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: ResponseInterface,
    setForm: Dispatch<SetStateAction<ResponseInterface>>
}

const FormAdd = ({ setClose, isEdit, form, setForm }: FormCreateProps) => {

    const createMaster = useCreateMaster()
    const updateMaster = useUpdateMaster()
    const { List: listJnsJabatanOptiom } = useMasterJnsJabatanOption()
    const { List: listRumpunJabatanJfOption } = useListRumpunJabatanJf(form.ref_rumpun_jabatan_nama)
    const { List: listInstansi } = useListInstansi(form.pembina_nama)

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
            ref_jns_jabatan_id: "",
            ref_jns_jabatan_nama: "",
            ref_rumpun_jabatan_id: "",
            ref_rumpun_jabatan_nama: "",
            pembina_id: "",
            pembina_nama: "",
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
                    title='Kode Ref Kela Jabatan (Id pada SIASN)'
                    placeholder='Kode Ref Kela Jabatan'
                    type='text'
                    value={form.kode}
                    onChange={(value) => {
                        setItemForm('kode', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInput
                    title='Nama Ref Kelas Jabatan'
                    placeholder='Nama Ref Kelas Jabatan'
                    type='text'
                    value={form.nama}
                    onChange={(value) => {
                        setItemForm('nama', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInputSelect
                    title='Jenis Jabatan Id'
                    datavalue={form.ref_jns_jabatan_id}
                    options={listJnsJabatanOptiom}
                    onChange={(value) => {
                        console.log(value)
                        setItemForm('ref_jns_jabatan_id', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BAutoComplete
                    title="Rumpun Jabatan"
                    placeholder="Cari Rumpun Jabatan..."
                    options={listRumpunJabatanJfOption}
                    getOptionLabel={(item) => item.value}
                    getOptionKey={(item) => item.id}
                    inputValue={form.ref_rumpun_jabatan_nama ?? ""}
                    onInputChange={(text) => {
                        setItemForm("ref_rumpun_jabatan_nama", text)
                    }}
                    onChange={(item) => {
                        setItemForm("ref_rumpun_jabatan_id", item?.id ?? "")
                    }}
                >
                    {(item) => (
                        <>
                            <span className="text-b-gray-5 font-bold">{item.value}</span>
                        </>
                    )}
                </BAutoComplete>
            </div>

            <div className='pt-1'>
                <BAutoComplete
                    title="Unit Pembina"
                    placeholder="Cari Unit Pembina..."
                    options={listInstansi}
                    getOptionLabel={(item) => item.value}
                    getOptionKey={(item) => item.id}
                    inputValue={form.pembina_nama ?? ""}
                    onInputChange={(text) => {
                        setItemForm("pembina_nama", text)
                    }}
                    onChange={(item) => {
                        setItemForm("pembina_id", item?.id ?? "")
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
