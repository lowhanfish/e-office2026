'use client'

import { useState } from 'react'
import { BsGear, BsGraphUpArrow, BsWhatsapp, BsInstagram, BsFacebook, BsTiktok, BsTelegram } from "react-icons/bs";
import ChartBar from '@/components/items/chart/ChartBar'
import BModal from '@/components/items/BModal';

const FrequentRAG = () => {

    const [list, setList] = useState([31, 21, 13, 15, 24]);
    const [labels, setLabels] = useState(['WhatsAppz', 'FaceBook', 'Instagram', 'TikTok', 'Telegram']);
    const [open, setOpen] = useState(false);


    const Data = [
        {
            name: "User Manual: Attendance Management System",
            access: 129,
            chunk: 12,
            status: true
        },
        {
            name: "Standard Operating Procedure: Application Development and Management",
            access: 278,
            chunk: 2,
            status: true
        },
        {
            name: "Presidential Decree regarding Electronic-Based Government Systems (SPBE)",
            access: 126,
            chunk: 9,
            status: true
        },
        {
            name: "List of General Cost Standards 1",
            access: 123,
            chunk: 7,
            status: true
        },
        {
            name: "List of General Cost Standards 2",
            access: 129,
            chunk: 7,
            status: false

        },
        {
            name: "List of General Cost Standards 3",
            access: 129,
            chunk: 7,
            status: false

        },
        {
            name: "List of General Cost Standards 4",
            access: 129,
            chunk: 7,
            status: false

        },
        {
            name: "List of General Cost Standards 5",
            access: 129,
            chunk: 7,
            status: false

        },
    ]




    return (
        <>

            <div className='grid grid-cols-12 gap-3 pt-2'>

                <div className='col-span-12 md:col-span-8 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10' >

                    <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                        <p className='text-b-gray-4'>Bar Chart</p>
                    </div>

                    <div className='h-75 overflow-scroll'>
                        <table className='Btable w-full'>
                            <thead>
                                <tr className="text-left">
                                    <th className='w-[5%] text-center'>No</th>
                                    <th className='w-[5%] text-center'>Act</th>
                                    <th className='w-[60%]'>File Name</th>
                                    <th className='w-[10%]'>Chunk</th>
                                    <th className='w-[10%]'>Access</th>
                                    <th className='w-[10%] text-center'>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Data.map((item, index) => (
                                    <tr key={item.name} className='poppins'>
                                        <td className=''>
                                            <p className='text-center'>{index + 1}</p>
                                        </td>
                                        <td className=''>
                                            <div className='flex justify-center'>
                                                <button onClick={() => setOpen(!open)} className='bg-b-gray-2/80 hover:bg-b-gray-2/50 flex justify-center items-center rounded-full w-6 h-6 cursor-pointer'>
                                                    <BsGear className='text-b-gray-6' />
                                                </button>
                                            </div>
                                        </td>
                                        <td className=''>{item.name}</td>
                                        <td className=''>
                                            <p className='text-center font-semibold bg-b-gray-2 rounded-sm'>{item.chunk}</p>
                                        </td>
                                        <td className=''>
                                            <p className='text-center font-semibold bg-b-gray-2 rounded-sm'>{item.access}</p>
                                        </td>
                                        <td className=''>
                                            <p className={`w-full
                                        ${item.status ? "bg-b-green-5/50" : "bg-b-red-5/50"}
                                        flex items-center justify-center rounded-2xl text-[10px] text-b-gray-6`}>
                                                {
                                                    item.status ? "Active" : "Deactive"
                                                }
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className='col-span-12 md:col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                    <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                        <p className='text-b-gray-4'>Bar Chart</p>
                    </div>
                    <ChartBar item='Session' list={list} labels={labels} />
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



        </>

    )
}

export default FrequentRAG
