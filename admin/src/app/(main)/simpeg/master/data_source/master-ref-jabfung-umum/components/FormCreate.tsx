import { Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import { useUrlStore } from '@/store/useUrlStore'
import { MasterResponse } from "../types"
import { useMasterJnsLokasiCreate } from '../hooks'
import BInputSelect from '@/components/items/BInputSelect'


interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: MasterResponse,
    setForm: Dispatch<SetStateAction<MasterResponse>>
}

const FormAdd = ({ setClose, isEdit, form, setForm }: FormCreateProps) => {

    const url = useUrlStore(state => state.URL.APP)
    const statusArr = useUrlStore(state => state.status)


    const { mutate } = useMasterJnsLokasiCreate()
    const setItemForm = (key: keyof MasterResponse, value: string | number) => {
        setForm({
            ...form,
            [key]: String(value)
        })
    }

    const emptyForm = () => {
        setForm({
            id: '',
            kode: '',
            kode_cepat: '',
            nama: '',
            status: true,
            created_by: "user.id"
        })
        setClose(false)
    }

    const submit = () => {
        if (isEdit) {
            mutate({
                url: `${url}/api/v1/simpeg/master/ref_jabfung_umum/update/${form.id}`,
                method: 'PUT',
                form: form
            })
        } else {
            mutate({
                url: `${url}/api/v1/simpeg/master/ref_jabfung_umum/create`,
                method: 'POST',
                form: form
            })
        }
    }

    return (
        <div className='px-5 pb-2'>
            <div className='pt-1'>
                <BInput
                    title='Kode Ref jabfung Umum (Id pada SIASN)'
                    placeholder='Kode Ref jabfung Umum'
                    type='text'
                    value={form.kode}
                    onChange={(value) => {
                        setItemForm('kode', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInput
                    title='Kode Cepat Ref jabfung Umum (Kode Cepat pada SIASN)'
                    placeholder='Kode Cepat Ref jabfung Umum'
                    type='text'
                    value={form.kode_cepat}
                    onChange={(value) => {
                        setItemForm('kode_cepat', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInput
                    title='Nama Ref jabfung Umum'
                    placeholder='Nama Ref jabfung Umum'
                    type='text'
                    value={form.nama}
                    onChange={(value) => {
                        setItemForm('nama', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInputSelect
                    title='Status'
                    options={statusArr}
                    datavalue={Number(form.status)}
                    onChange={(value) => {
                        setForm(prevForm => ({
                            ...prevForm,
                            status: Number(value) === 1
                        }))
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
