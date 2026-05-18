import React from 'react'
import CodeWrapper from './CodeWrapper'
import BButton from '@/components/items/BButton'



const ListModal = () => {
    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>

                <div className='col-span-3 '>

                </div>




            </div>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>

        </div>
    )
}

export default ListModal



const codeString = `
"use client"

import { useState } from 'react'
import BCheckBox from '@/components/items/BCheckBox'

const InputDataRd = () => {

    const [data, setData] = useState<boolean>(false);

    
}

export default InputDataRd
    
`
