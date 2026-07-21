import { Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import { useUrlStore } from '@/store/useUrlStore'
import { useQueryClient, useMutation } from "@tanstack/react-query"
// import { JenisInstansiId } from "@/constants/instansi"
import BInputSelect from '@/components/items/BInputSelect'
import { useGetAllJenisInstansi } from '@/features/simpeg/master/data-source/ref-jenis-instansi/hooks'
import { useGetRefJenisInstansiIdAll } from '@/features/simpeg/master/data-source/ref-jenis-instansi-id/hooks'



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
    setForm: Dispatch<SetStateAction<FormData>>,
    setItemForm: (key: keyof FormData, value: any) => void
    emptyForm: () => void
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

const FormAdd = ({ setClose, isEdit, form, setForm, setItemForm, emptyForm }: FormCreateProps) => {

    const { List: JenisInstansi } = useGetAllJenisInstansi()
    const { List: JenisInstansiId } = useGetRefJenisInstansiIdAll()
    const queryclient = useQueryClient()
    const url = useUrlStore(state => state.URL.APP)

    const createDataMutation = useMutation({
        mutationFn: ({ newUrl, newForm, newMethod }: { newUrl: string, newForm: FormData, newMethod: string }) => createData(
            newUrl,
            newForm,
            newMethod
        ),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["ref_instansi"] });
            emptyForm()
            setClose(false)
        },
        onError: (err: any) => {
            alert("err")
        }
    })


    const submit = () => {
        if (isEdit) {
            createDataMutation.mutate({
                newUrl: `${url}/api/v1/simpeg/master/ref_instansi/update/${form.id}`,
                newForm: form,
                newMethod: "PUT"
            })
        } else {
            createDataMutation.mutate({
                newUrl: `${url}/api/v1/simpeg/master/ref_instansi/create`,
                newForm: form,
                newMethod: "POST"
            })
        }
    }


    return (
        <div className='px-5 pb-2'>

            <div className='grid grid-cols-1 lg:gap-3 lg:grid-cols-2'>
                <div className='col-span-1 pt-1'>
                    <BInputSelect
                        title='Id Jenis Instansi (Pada SIASN)'
                        options={JenisInstansiId}
                        datavalue={form.jenis_instansi_id}
                        onChange={(value) => {
                            setItemForm('jenis_instansi_id', value)
                        }}
                    />
                </div>
                <div className='col-span-1 pt-1'>
                    <BInputSelect
                        title='Jenis Instansi (Pada SIASN)'
                        options={JenisInstansi}
                        datavalue={form.jenis}
                        onChange={(value) => {
                            setItemForm('jenis', value)
                        }}
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 lg:gap-3 lg:grid-cols-2 pt-1'>
                <div className='col-span-1'>
                    <BInput
                        title='Kode'
                        placeholder='Kode (Pada SIASN)'
                        type='text'
                        value={form.kode}
                        onChange={(value) => {
                            setItemForm('kode', value)
                        }}
                    />
                </div>
                <div className='col-span-1'>
                    <BInput
                        title='Kode Cepat'
                        placeholder='Kode Cepat (Pada SIASN)'
                        type='text'
                        value={form.kode_cepat}
                        onChange={(value) => {
                            setItemForm('kode_cepat', value)
                        }}
                    />
                </div>
            </div>

            <div className='pt-1'>
                <BInput
                    title='Nama Instansi'
                    placeholder='Nama Instansi'
                    type='text'
                    value={form.nama}
                    onChange={(value) => {
                        setItemForm('nama', value)
                    }}
                />
            </div>


            <div className='flex gap-2 justify-end mt-5 py-2 border-y border-b-gray-2'>
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
