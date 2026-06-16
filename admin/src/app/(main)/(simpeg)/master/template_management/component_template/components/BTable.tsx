"use client"

import { useState, useEffect } from 'react'
import { BsGear } from "react-icons/bs";
import CodeWrapper from './CodeWrapper'
import BModal from '@/components/items/BModal';

const Data = [
    {
        name: "Kiken S batara, S.Si.,MT",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        email: 'lowhanfish@gmail.com',
        status: "reject"
    },
    {
        name: "Riswan M Rizal. ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        email: 'kikensbatara@gmail.com',
        status: "pending"
    },
    {
        name: "Muh. Hidayat Dermawan. ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        email: 'lowhanfish@gmail.com',
        status: "approve"
    },
    {
        name: "Asrif Fajar Hidayat",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        email: 'kikensbatara@gmail.com',
        status: "pending"
    },
]

const BTable = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <table className='Btable w-full'>
                <thead>
                    <tr>
                        <th className='w-[5%]'>
                            <p className='text-center'>No</p>
                        </th>
                        <th className='w-[5%]'>
                            <p className='text-center'>Act</p>
                        </th>
                        <th className='w-[25%]'>Name</th>
                        <th className='w-[35%]'>Address</th>
                        <th className='w-[20%]'>email</th>
                        <th className='w-[10%]'>
                            <p className='text-center'>status</p>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        Data.map((item, index) => (
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
                                <td className=''>{item.address}</td>
                                <td className=''>
                                    <p className='text-center bg-b-gray-2 rounded-sm'>{item.email}</p>
                                </td>
                                <td className=''>
                                    <p className={`w-30
                                        ${item.status == "pending" ? "bg-b-yellow-5/50" : item.status == "approve" ? "bg-b-green-5/50" : "bg-b-red-5/50"
                                        }
                                        flex items-center justify-center rounded-2xl text-[10px] text-b-gray-6`}>
                                        {item.status}
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <BModal title='Configuration' openModal={open} setOpenModal={setOpen} size='xs'>
                <div className='flex flex-col gap-2 p-4'>
                    <button className='bg-b-blue-4 hover:bg-b-blue-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-[5] shadow-md'>
                        Detail
                    </button>
                    <button className='bg-b-yellow-4 hover:bg-b-yellow-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-[5] shadow-md'>
                        Edit
                    </button>
                    <button className='bg-b-red-4 hover:bg-b-red-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-[5] shadow-md'>
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

export default BTable



const codeString = `
"use client"

import { useState, useEffect } from 'react'
import { BsGear } from "react-icons/bs";
import BModal from '@/components/items/BModal';

const Data = [
    {
        name: "Kiken S batara, S.Si.,MT",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        email: 'lowhanfish@gmail.com',
        status: "reject"
    },
    {
        name: "Riswan M Rizal. ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        email: 'kikensbatara@gmail.com',
        status: "pending"
    },
    {
        name: "Muh. Hidayat Dermawan. ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        email: 'lowhanfish@gmail.com',
        status: "approve"
    },
    {
        name: "Asrif Fajar Hidayat",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        email: 'kikensbatara@gmail.com',
        status: "pending"
    },
]

const BTable = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <table className='Btable w-full'>
                <thead>
                    <tr>
                        <th className='w-[5%]'>
                            <p className='text-center'>No</p>
                        </th>
                        <th className='w-[5%]'>
                            <p className='text-center'>Act</p>
                        </th>
                        <th className='w-[25%]'>Name</th>
                        <th className='w-[35%]'>Address</th>
                        <th className='w-[20%]'>email</th>
                        <th className='w-[10%]'>
                            <p className='text-center'>status</p>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        Data.map((item, index) => (
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
                                <td className=''>{item.address}</td>
                                <td className=''>
                                    <p className='text-center bg-b-gray-2 rounded-sm'>{item.email}</p>
                                </td>
                                <td className=''>
                                    <p className={\`w-30
                                        \${item.status == "pending" ? "bg-b-yellow-5/50" : item.status == "approve" ? "bg-b-green-5/50" : "bg-b-red-5/50"
                                        }
                                        flex items-center justify-center rounded-2xl text-[10px] text-b-gray-6\`}>
                                        {item.status}
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <BModal title='Configuration' openModal={open} setOpenModal={setOpen} size='xs'>
                <div className='flex flex-col gap-2 p-4'>
                    <button className='bg-b-blue-4 hover:bg-b-blue-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-[5] shadow-md'>
                        Detail
                    </button>
                    <button className='bg-b-yellow-4 hover:bg-b-yellow-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-[5] shadow-md'>
                        Edit
                    </button>
                    <button className='bg-b-red-4 hover:bg-b-red-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-[5] shadow-md'>
                        Delete
                    </button>
                </div>
            </BModal>
        </div>
    )
}

export default BTable
`;