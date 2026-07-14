import { useState, Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import { useUrlStore } from '@/store/useUrlStore'
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

interface FormData {
    id: string,
    kode: string,
    nama: string,
    kode_cepat: string,
    jenis: string,
    jenis_instansi_id: string,
    created_by: string
}

interface FormResponse {
    id: string,
    kode: string,
    nama: string,
    kode_cepat: string,
    jenis: string,
    jenis_instansi_id: string,
    created_by: string,
    created_at: string
}

interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: FormData,
    setForm: Dispatch<SetStateAction<FormData>>
}

const createData = async (url: string, data: FormData, method: string) => {
    try {
        const res = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        if (!res.ok) throw new Error(``)
        const result = await res.json()
        return result

    } catch (error) {
        alert(`Error fetch saat menambah data. status : ${error}`)
    }
}

const FormAdd = ({ setClose, isEdit, form, setForm }: FormCreateProps) => {

    const queryclient = useQueryClient()

    const url = useUrlStore(state => state.URL.APP)
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
            kode_cepat: '',
            jenis: '',
            jenis_instansi_id: '',
            created_by: "user.id"
        })
        setClose(false)
    }

    const createDataMutation = useMutation({
        mutationFn: ({ newUrl, newForm, newMethod }: { newUrl: string, newForm: FormData, newMethod: string }) => createData(
            newUrl,
            newForm,
            newMethod
        ),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["ref_instansi"] });
            emptyForm()
        },
        onError: (err: any) => {
            alert("err")
        }
    })


    const submit = () => {
        if (isEdit) {
            createDataMutation.mutate({
                newUrl: `${url}/api/v1/simpeg/master/ref_jns_pegawai/update/${form.id}`,
                newForm: form,
                newMethod: "PUT"
            })
        } else {
            createDataMutation.mutate({
                newUrl: `${url}/api/v1/simpeg/master/ref_jns_pegawai/create`,
                newForm: form,
                newMethod: "POST"
            })
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
