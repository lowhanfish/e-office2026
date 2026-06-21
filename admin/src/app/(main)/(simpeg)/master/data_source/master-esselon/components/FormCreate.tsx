import { useState, Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'

interface FormAddProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean
}

const FormAdd = ({ setClose, isEdit }: FormAddProps) => {

    const [textx, setTextx] = useState<string | number>("")
    const [form, setForm] = useState({
        id: null,
        kode: '',
        nama: '',
        jabatan_asn: '',
    })

    const setItemForm = (key: string, value: any) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    const submit = () => {
        console.log(form)
    }


    return (
        <div className='px-5 pb-2'>
            <div className='pt-1'>
                <BInput
                    title='Kode Esselon (Id pada SIASN)'
                    placeholder='Kode esselon'
                    type='text'
                    value={form.kode}
                    onChange={(value) => {
                        setItemForm('kode', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInput
                    title='Nama Esselon'
                    placeholder='Nama Esselon'
                    type='text'
                    value={form.nama}
                    onChange={(value) => {
                        setItemForm('nama', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInput
                    title='Jabatan ASN'
                    placeholder='Jabatan ASN'
                    type='text'
                    value={form.jabatan_asn}
                    onChange={(value) => {
                        setItemForm('jabatan_asn', value)
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
                                onClick={() => { }}
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
                        onClick={() => { setClose(false) }}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Cancel</p>
                    </BButton>
                </div>
            </div>

        </div>
    )
}

export default FormAdd
