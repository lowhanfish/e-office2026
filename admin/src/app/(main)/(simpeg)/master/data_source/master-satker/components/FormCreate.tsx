import { Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import { useUrlStore } from '@/store/useUrlStore'
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useCreateMasterSatker } from '@/features/simpeg/master/data-source/master-satker/hooks'
import { masterSatkerItem, masterSatkerListAll, masterSatkerList, masterSatkerCreate } from "@/features/simpeg/master/data-source/master-satker/types"
import { useGetMasterInstansiOption } from '@/features/simpeg/master/data-source/master-instansi/hooks'
import BInputSelect from '@/components/items/BInputSelect'


interface FormData {
    id: string,
    kode: string,
    nama: string,
    instansi_id: string,
    created_by: string
}

// const Instansi = [
//     { id: "xx", value: "yyyy" },
//     { id: "yyy", value: "yyyy" },
// ]


interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    form: masterSatkerItem,
    setForm: Dispatch<SetStateAction<masterSatkerItem>>,
    setItemForm: (key: keyof masterSatkerItem, value: any) => void
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

    const Instansi = useGetMasterInstansiOption()
    const queryclient = useQueryClient()
    const url = useUrlStore(state => state.URL.APP)
    const { mutate } = useCreateMasterSatker();


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
            alert(`Error : ${err}`)
        }
    })

    const submit = () => {
        if (isEdit) {
            // createDataMutation.mutate({
            //     newUrl: `${url}/api/v1/simpeg/master/ref_instansi/update/${form.id}`,
            //     newForm: form,
            //     newMethod: "PUT"
            // })
            mutate({
                newUrl: `${url}/api/v1/simpeg/master/ref_satker/update/${form.id}`,
                newForm: form,
                method: "PUT"
            })
        } else {
            // createDataMutation.mutate({
            //     newUrl: `${url}/api/v1/simpeg/master/ref_instansi/create`,
            //     newForm: form,
            //     newMethod: "POST"
            // })


            mutate({
                newUrl: `${url}/api/v1/simpeg/master/ref_satker/creat`,
                newForm: form,
                method: "POST"
            })

        }
    }

    return (
        <div className='px-5 pb-2'>

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
                        title='Nama Satker'
                        placeholder='Nama Satker'
                        type='text'
                        value={form.nama}
                        onChange={(value) => {
                            setItemForm('nama', value)
                        }}
                    />
                </div>
            </div>

            <div className='pt-1'>
                <BInputSelect
                    title='Jenis Instansi (Pada SIASN)'
                    options={Instansi}
                    datavalue={form.instansi_id}
                    onChange={(value: any) => {
                        setItemForm('instansi_id', value)
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
