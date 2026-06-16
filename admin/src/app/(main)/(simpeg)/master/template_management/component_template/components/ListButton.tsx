"use client"
import React from 'react'
import CodeWrapper from './CodeWrapper'
import BButton from '@/components/items/BButton'

const ListButton = () => {

    const testClick = () => {
        console.log("hy")
    }

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 w-full'>

                <div className='col-span-6 flex flex-col md:flex-row  gap-2'>
                    <BButton
                        color='gray'
                        size='xs'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[12px]'>size = xs</p>
                    </BButton>
                    <BButton
                        color='gray'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>size = sm</p>
                    </BButton>
                    <BButton
                        color='gray'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[14px]'>size = md</p>
                    </BButton>
                    <BButton
                        color='gray'
                        size='lg'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[15px]'>size = lg</p>
                    </BButton>
                    <BButton
                        color='gray'
                        size='xl'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[16px]'>size = xs</p>
                    </BButton>

                </div>

                <div className='col-span-6 flex flex-col md:flex-row  gap-2'>

                    <BButton
                        color='gray'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Gray</p>
                    </BButton>
                    <BButton
                        color='blue'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Blue</p>
                    </BButton>
                    <BButton
                        color='green'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Green</p>
                    </BButton>
                    <BButton
                        color='yellow'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Yellow</p>
                    </BButton>
                    <BButton
                        color='red'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Red</p>
                    </BButton>
                </div>


                <div className='col-span-12 flex flex-col md:flex-row  gap-2'>
                    <BButton
                        mode="3d"
                        color='blue'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>Mode : glossy</p>
                    </BButton>

                    <BButton
                        mode="glossy"
                        color='green'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>Mode : glossy</p>
                    </BButton>

                    <BButton
                        mode="neo"
                        color='yellow'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-7 font-semibold text-[13px] dark:text-shadow-xs dark:text-shadow-zinc-500'>Mode : neo</p>
                    </BButton>
                    <BButton
                        mode="neon"
                        color='red'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>Mode : neon</p>
                    </BButton>
                </div>
            </div>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>

        </div>
    )
}

export default ListButton



const codeString = `
"use client"
import React from 'react'
import BButton from '@/components/items/BButton'

const ListButton = () => {

    const testClick = () => {
        console.log("hy")
    }

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 w-full'>

                <div className='col-span-6 flex flex-col md:flex-row  gap-2'>
                    <BButton
                        color='gray'
                        size='xs'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[12px]'>size = xs</p>
                    </BButton>
                    <BButton
                        color='gray'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>size = sm</p>
                    </BButton>
                    <BButton
                        color='gray'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[14px]'>size = md</p>
                    </BButton>
                    <BButton
                        color='gray'
                        size='lg'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[15px]'>size = lg</p>
                    </BButton>
                    <BButton
                        color='gray'
                        size='xl'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[16px]'>size = xs</p>
                    </BButton>

                </div>

                <div className='col-span-6 flex flex-col md:flex-row  gap-2'>

                    <BButton
                        color='gray'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Gray</p>
                    </BButton>
                    <BButton
                        color='blue'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Blue</p>
                    </BButton>
                    <BButton
                        color='green'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Green</p>
                    </BButton>
                    <BButton
                        color='yellow'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Yellow</p>
                    </BButton>
                    <BButton
                        color='red'
                        size='sm'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-6 text-[13px]'>Red</p>
                    </BButton>
                </div>


                <div className='col-span-12 flex flex-col md:flex-row  gap-2'>
                    <BButton
                        mode="3d"
                        color='blue'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>Mode : glossy</p>
                    </BButton>

                    <BButton
                        mode="glossy"
                        color='green'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>Mode : glossy</p>
                    </BButton>

                    <BButton
                        mode="neo"
                        color='yellow'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-b-gray-7 font-semibold text-[13px] dark:text-shadow-xs dark:text-shadow-zinc-500'>Mode : neo</p>
                    </BButton>
                    <BButton
                        mode="neon"
                        color='red'
                        size='md'
                        onClick={() => testClick()}
                    >
                        <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>Mode : neon</p>
                    </BButton>
                </div>
            </div>

        </div>
    )
}

export default ListButton
    
`
