import { useState, Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import { useUrlStore } from '@/store/useUrlStore'

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

interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: FormData,
    setForm: Dispatch<SetStateAction<FormData>>
}


const FormAdd = ({ setClose, isEdit, form, setForm }: FormCreateProps) => {

    const url = useUrlStore(state => state.URL)
    const [textx, setTextx] = useState<string | number>("")



    const setItemForm = (key: string, value: any) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    const emptyForm = () => {
        setForm({
            id: '',
            kode: '',
            nama: '',
            created_by: "user.id"
        })
        setClose(false)
    }

    const submit = () => {

    }

    return (
        <div className='px-5 pb-2'>
            <div className='pt-1'>
                <BInput
                    title='Kode Golongan (Id pada SIASN)'
                    placeholder='Kode Golongan'
                    type='text'
                    value={form.kode}
                    onChange={(value) => {
                        setItemForm('kode', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInput
                    title='Nama Golongan'
                    placeholder='Nama Golongan'
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
