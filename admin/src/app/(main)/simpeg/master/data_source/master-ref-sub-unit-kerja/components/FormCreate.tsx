import { Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'


import { CreateInterface, ResponseInterface, ResponseListInterface } from "../types"
import { useCreateMaster, useUpdateMaster } from '../hooks/crud';
import BInputSelect from '@/components/items/BInputSelect'
import { useUrlStore } from '@/store/useUrlStore';


interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: ResponseInterface,
    setForm: Dispatch<SetStateAction<ResponseInterface>>
}

const FormAdd = ({ setClose, isEdit, form, setForm }: FormCreateProps) => {

    const createMaster = useCreateMaster()
    const updateMaster = useUpdateMaster()
    const choose = useUrlStore(state => state.choose)

    const setItemForm = (key: keyof ResponseInterface, value: string | number) => {
        setForm({
            ...form,
            [key]: String(value)
        })
    }

    const emptyForm = () => {
        setForm({
            id: '',
            nama: '',
            unit_induk: false,
            penyedia_pbj: false,
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
                    title='Nama Sub Unit Kerja'
                    placeholder='Nama Sub Unit Kerja'
                    type='text'
                    value={form.nama}
                    onChange={(value) => {
                        setItemForm('nama', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInputSelect
                    title='Unit Induk ?'
                    options={choose}
                    datavalue={Number(form.unit_induk)}
                    onChange={(value) => {
                        setForm(prevForm => ({
                            ...prevForm,
                            unit_induk: Number(value) === 1
                        }))
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInputSelect
                    title='Penyedia PBJ ?'
                    options={choose}
                    datavalue={Number(form.penyedia_pbj)}
                    onChange={(value) => {
                        setForm(prevForm => ({
                            ...prevForm,
                            penyedia_pbj: Number(value) === 1
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
