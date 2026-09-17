import { Dispatch, SetStateAction } from 'react'

import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'
import BInputSelect from '@/components/items/BInputSelect'
import { useUrlStore } from '@/store/useUrlStore'
import { useRefJnsLokasiOptions, useSaveRefLokasi } from '../hooks'
import type { RefLokasiItem, SelectOption } from '../types'

interface FormCreateProps {
    setClose: Dispatch<SetStateAction<boolean>>
    isEdit: boolean
    form: RefLokasiItem
    setForm: Dispatch<SetStateAction<RefLokasiItem>>
    parentLocations: RefLokasiItem[]
}

const FormCreate = ({ setClose, isEdit, form, setForm, parentLocations }: FormCreateProps) => {
    const apiUrl = useUrlStore(state => state.URL.APP)
    const saveMutation = useSaveRefLokasi()
    const availableJnsLokasiOptions = useRefJnsLokasiOptions()
    const jnsLokasiOptions: SelectOption[] = [
        { id: '', value: 'Pilih jenis lokasi' },
        ...availableJnsLokasiOptions,
    ]
    const parentOptions: SelectOption[] = [
        { id: '', value: 'Tanpa induk lokasi' },
        ...parentLocations
            .filter(item => item.id !== form.id)
            .map(item => ({ id: item.id, value: `${item.kode} - ${item.nama}` })),
    ]

    const setItemForm = (key: keyof RefLokasiItem, value: string) => {
        setForm(current => ({ ...current, [key]: value }))
    }

    const submit = () => {
        const url = isEdit
            ? `${apiUrl}/api/v1/simpeg/master/ref_lokasi/update/${form.id}`
            : `${apiUrl}/api/v1/simpeg/master/ref_lokasi/create`

        saveMutation.mutate(
            { url, method: isEdit ? 'PUT' : 'POST', form },
            {
                onSuccess: () => {
                    setClose(false)
                },
            },
        )
    }

    return (
        <div className='px-5 pb-2'>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-3'>
                <BInput title='Kode' placeholder='Kode lokasi' type='text' value={form.kode} onChange={value => setItemForm('kode', String(value))} />
                <BInput title='Kode Cepat' placeholder='Kode cepat' type='text' value={form.kode_cepat} onChange={value => setItemForm('kode_cepat', String(value))} />
            </div>
            <BInput title='Nama Lokasi' placeholder='Nama lokasi' type='text' value={form.nama} onChange={value => setItemForm('nama', String(value))} />
            <BInput title='Kanreg ID' placeholder='ID Kanreg' type='text' value={form.kanreg_id} onChange={value => setItemForm('kanreg_id', String(value))} />
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-3 pt-1'>
                <BInputSelect
                    title='Jenis Lokasi'
                    options={jnsLokasiOptions}
                    datavalue={form.ref_jns_lokasi_id}
                    onChange={value => setItemForm('ref_jns_lokasi_id', String(value))}
                />
                <BInputSelect
                    title='Induk Lokasi'
                    options={parentOptions}
                    datavalue={form.ref_lokasi_id ?? ''}
                    onChange={value => setItemForm('ref_lokasi_id', String(value))}
                />
            </div>

            {saveMutation.isError && (
                <p className='mt-3 text-xs text-b-red-5'>{saveMutation.error.message}</p>
            )}

            <div className='flex gap-2 justify-end mt-3 py-2 border-y border-b-gray-2'>
                <div className='w-30'>
                    <BButton
                        color={isEdit ? 'yellow' : 'blue'}
                        size='sm'
                        onClick={submit}
                        disabled={saveMutation.isPending}
                    >
                        <p className='text-b-gray-6 text-[13px]'>
                            {saveMutation.isPending ? 'Proses...' : isEdit ? 'Edit' : 'Save'}
                        </p>
                    </BButton>
                </div>
                <div className='w-30'>
                    <BButton color='red' size='sm' onClick={() => setClose(false)}>
                        <p className='text-b-gray-6 text-[13px]'>Cancel</p>
                    </BButton>
                </div>
            </div>
        </div>
    )
}

export default FormCreate
