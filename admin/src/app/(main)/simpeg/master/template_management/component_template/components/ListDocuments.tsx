'use client'

import { useState } from 'react';
import BlistDocument from '@/components/items/BlistDocument';
import { BsFileTextFill, BsGear } from "react-icons/bs";
import BModal from '@/components/items/BModal';
import CodeWrapper from './CodeWrapper';

const ListDocuments = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid w-full'>
                <div className='grid grid-cols-12 gap-2 md:gap-2'>
                    {
                        [...Array(4)].map((_, index) => (
                            <div key={index} className='col-span-12 md:col-span-6 w-full'>
                                <BlistDocument
                                    icon={
                                        <BsFileTextFill className='text-[30px] text-b-gray-4' />
                                    }
                                    title='Empty Title'
                                    stamp="20 Apr 2026"
                                    subtitle='Empty Subtitle'
                                    onClick={() =>
                                        setOpen(true)
                                    }
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            <BModal title='Configuration' openModal={open} setOpenModal={setOpen} size='xs'>
                <div className='flex flex-col gap-2 p-4'>
                    <button className='bg-b-blue-4 hover:bg-b-blue-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'>
                        Detail
                    </button>
                    <button className='bg-b-yellow-4 hover:bg-b-yellow-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'>
                        Edit
                    </button>
                    <button className='bg-b-red-4 hover:bg-b-red-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'>
                        Delete
                    </button>
                </div>
            </BModal>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>
        </div>
    )
}

export default ListDocuments


const codeString = `
'use client'

import { useState } from 'react';
import BlistDocument from '@/components/items/BlistDocument';
import { BsFileTextFill, BsGear } from "react-icons/bs";
import BModal from '@/components/items/BModal';
import CodeWrapper from './CodeWrapper';

const ListDocuments = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid w-full'>
                <div className='grid grid-cols-12 gap-2 md:gap-2'>
                    {
                        [...Array(4)].map((_, index) => (
                            <div key={index} className='col-span-12 md:col-span-6 w-full'>
                                <BlistDocument
                                    icon={
                                        <BsGear className='text-[30px] text-b-gray-4' />
                                    }
                                    title='Empty Title'
                                    subtitle='Empty Subtitle'
                                    onClick={() =>
                                        setOpen(true)
                                    }
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            <BModal title='Configuration' openModal={open} setOpenModal={setOpen} size='xs'>
                <div className='flex flex-col gap-2 p-4'>
                    <button className='bg-b-blue-4 hover:bg-b-blue-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'>
                        Detail
                    </button>
                    <button className='bg-b-yellow-4 hover:bg-b-yellow-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'>
                        Edit
                    </button>
                    <button className='bg-b-red-4 hover:bg-b-red-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'>
                        Delete
                    </button>
                </div>
            </BModal>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>
        </div>
    )
}

export default ListDocuments

        `;
