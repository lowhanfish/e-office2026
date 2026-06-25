import { useState, Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import { useUrlStore } from '@/store/useUrlStore'
import { useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"

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

const createData = async (url: string, data: FormData): Promise<FormResponse> => {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Gagal menambah data baru")
    return res.json();
}

const updateData = async (url: string, data: FormData) => {
    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Gagal Mengubah data`)
    return res.json();
}

const FormAdd = ({ setClose, isEdit, form, setForm }: FormCreateProps) => {

    const queryClient = useQueryClient()
    const url = useUrlStore(state => state.URL)
    const [textx, setTextx] = useState<string | number>("")

    const createDataMutation = useMutation({
        mutationFn: (newFormData: FormData) => createData(
            `${url.APP}/api/v1/simpeg/master/ref_jns_kawin/create`,
            newFormData
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ref_jns_kawin'] });
            emptyForm()
        },
        onError: (err: any) => {
            alert(`Error : ${err}`)
        }
    })

    const updateDataMutation = useMutation({
        mutationFn: (newFormData: FormData) => updateData(
            `${url.APP}/api/v1/simpeg/master/ref_jns_kawin/update/${form.id}`,
            newFormData
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ref_jns_kawin'] });
            emptyForm()
        },
        onError: (err: any) => {
            alert(`Error : ${err}`)
        }
    })

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
        // console.log(form)
        if (isEdit) {
            updateDataMutation.mutate(form)
        } else {
            createDataMutation.mutate(form)
        }
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
