"use client"

import { useState } from 'react'
import DocumentationSection from './DocumentationSection'
import { componentDocumentation } from './componentDocumentation'
import BPagination from '@/components/items/BPagination'

const ListPagination = () => {
    const [pageSelect, setPageSelect] = useState<number>(1);
    const pageLimit = 4
    const dataLength = 48

    const testClick = () => {
        console.log("hy")
    }

    return (
        <DocumentationSection documentation={componentDocumentation.ListPagination} codeString={codeString}> 
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 w-full'>

                <div className='col-span-1 md:col-span-12 flex flex-wrap items-center gap-3'>
                    <BPagination
                        pageSelect={pageSelect}
                        setPageSelect={setPageSelect}
                        pageLimit={pageLimit}
                        pageShow={pageLimit}
                        dataLength={dataLength}
                        onClick={testClick}
                    />
                </div>
            </div>

            <p className='mt-5 text-sm'>Halaman {pageSelect} dari {Math.ceil(dataLength / pageLimit)} · {dataLength} data</p>
        </DocumentationSection>
    )
}

export default ListPagination

const codeString = `"use client"

import { useState } from 'react'
import BPagination from '@/components/items/BPagination'

const ListPagination = () => {
    const [pageSelect, setPageSelect] = useState<number>(1);
    const pageLimit = 4
    const dataLength = 48

    const testClick = () => {
        console.log("hy")
    }

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 w-full'>

                <div className='col-span-1 md:col-span-12 flex flex-wrap items-center gap-3'>
                    <BPagination
                        pageSelect={pageSelect}
                        setPageSelect={setPageSelect}
                        pageLimit={pageLimit}
                        pageShow={pageLimit}
                        dataLength={dataLength}
                        onClick={testClick}
                    />
                </div>
            </div>

            <p className='mt-5 text-sm'>Halaman {pageSelect} dari {Math.ceil(dataLength / pageLimit)} · {dataLength} data</p>
        </div>
    )
}

export default ListPagination`
