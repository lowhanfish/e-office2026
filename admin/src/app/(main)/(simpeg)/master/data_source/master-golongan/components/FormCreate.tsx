import { useState, Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import { useUrlStore } from '@/store/useUrlStore'
import { useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"

interface FormData {
    id: string,
    kode: string,
    nama: string,
    nama_pangkat: string,
    gol_pppk: string,
    created_by: string
}

interface FormResponse {
    id: string,
    kode: string,
    nama: string,
    nama_pangkat: string,
    gol_pppk: string,
    created_by: string,
    created_at: string
}

interface FormAddProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean
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

const FormAdd = ({ setClose, isEdit }: FormAddProps) => {

    const queryClient = useQueryClient()
    const url = useUrlStore(state => state.URL)
    const [textx, setTextx] = useState<string | number>("")
    const [form, setForm] = useState<FormData>({
        id: '',
        kode: '',
        nama: '',
        nama_pangkat: '',
        gol_pppk: '',
        created_by: "user.id"
    })

    const createDataMutation = useMutation({
        mutationFn: (newFormData: FormData) => createData(
            `${url.APP}/api/v1/simpeg/master/ref_golongan/create`,
            newFormData
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ref_golongan'] });
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
            nama_pangkat: '',
            gol_pppk: '',
            created_by: "user.id"
        })
        setClose(false)
    }

    const submit = () => {
        console.log(form)
        createDataMutation.mutate(form)
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
            <div className='pt-1'>
                <BInput
                    title='Nama Pangkat'
                    placeholder='Nama Pangkat'
                    type='text'
                    value={form.nama_pangkat}
                    onChange={(value) => {
                        setItemForm('nama_pangkat', value)
                    }}
                />
            </div>
            <div className='pt-1'>
                <BInput
                    title='Gol-PPPK'
                    placeholder='Gol-PPPK'
                    type='text'
                    value={form.gol_pppk}
                    onChange={(value) => {
                        setItemForm('gol_pppk', value)
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
