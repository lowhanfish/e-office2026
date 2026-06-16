"use client"

import { useState } from 'react'
import CodeWrapper from './CodeWrapper'
import BPagination from '@/components/items/BPagination'

const ListPagination = () => {
    const [pageSelect, setPageSelect] = useState<number>(1);
    const [pageLimit, setPageLimit] = useState<number>(4)
    const [dataLength, setDataLength] = useState<number>(99999)

    const testClick = () => {
        console.log("hy")
    }

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 w-full'>

                <div className='col-span-12 flex flex-col md:flex-row  gap-2'>
                    <BPagination
                        pageSelect={pageSelect}
                        setPageSelect={setPageSelect}
                        pageLimit={pageLimit}
                        dataLength={dataLength}
                        onClick={testClick}
                    />
                </div>
            </div>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>

        </div>
    )
}

export default ListPagination

const codeString = `
"use client"

import { useState } from 'react'
import BPagination from '@/components/items/BPagination'

const ListPagination = () => {
    const [pageSelect, setPageSelect] = useState<number>(1);
    const [pageLimit, setPageLimit] = useState<number>(4)
    const [dataLength, setDataLength] = useState<number>(99999)

    const testClick = () => {
        console.log("hy")
    }

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 w-full'>

                <div className='col-span-12 flex flex-col md:flex-row  gap-2'>
                    <BPagination
                        pageSelect={pageSelect}
                        setPageSelect={setPageSelect}
                        pageLimit={pageLimit}
                        dataLength={dataLength}
                        onClick={testClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default ListPagination
    
`
