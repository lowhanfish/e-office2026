import { useState, Dispatch, SetStateAction } from 'react'
import BButton from '@/components/items/BButton'
import BInput from '@/components/items/BInput'

interface FormAddProps {
    setClose: Dispatch<SetStateAction<any>>
}

const FormAdd = ({ setClose }: FormAddProps) => {
    const [textx, setTextx] = useState<string | number>("")

    return (
        <div className='px-5 pb-2'>
            <div>
                <BInput
                    title='Kode Esselon (Id pada SIASN)'
                    placeholder='Kode esselon'
                    type='text'
                    value={textx}
                    onChange={(value) => {
                        setTextx(value)
                    }}
                />
            </div>
            <div>
                <BInput
                    title='Nama Esselon'
                    placeholder='Nama Esselon'
                    type='text'
                    value={textx}
                    onChange={(value) => {
                        setTextx(value)
                    }}
                />
            </div>
            <div>
                <BInput
                    title='Jabatan ASN'
                    placeholder='Jabatan ASN'
                    type='text'
                    value={textx}
                    onChange={(value) => {
                        setTextx(value)
                    }}
                />
            </div>

            <div className='flex gap-2 justify-end mt-3 py-2 border-y border-b-gray-2'>
                <div className='w-30'>
                    <BButton
                        color='blue'
                        size='sm'
                        onClick={() => { }}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Save</p>
                    </BButton>
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
