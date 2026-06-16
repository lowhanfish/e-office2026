
"use client"

import { useState } from 'react'
import BInput from '@/components/items/BInput'
import TextSeparate from '@/components/items/TextSeparate';
import { BsGear } from "react-icons/bs";
import BModal from '@/components/items/BModal';

const InputData = () => {

    const [numberx, setNumberx] = useState<number | string>(0)
    const [textx, setTextx] = useState<string | number>("")
    const [open, setOpen] = useState(false);


    const Data = [
        {
            name: "Kiken S batara, S.Si.,MT",
            role: "Fullstack AI Engineer",
            address: "Jl. Beringin No. 31",
            status: "reject"
        },
        {
            name: "Riswan M Rizal. ST",
            role: "Fullstack AI Engineer",
            address: "Jl. Beringin No. 31",
            status: "pending"
        },
        {
            name: "Muh. Hidayat Dermawan. ST",
            role: "Fullstack AI Engineer",
            address: "Jl. Beringin No. 31",
            status: "approve"
        },
        {
            name: "Asrif Fajar Hidayat",
            role: "Fullstack AI Engineer",
            address: "Jl. Beringin No. 31",
            status: "pending"
        },
    ]

    return (



        <div>
            <TextSeparate title='Input / Field' />
            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>
                    <div className='col-span-6 '>
                        <BInput
                            title='Data number'
                            placeholder='Data number'
                            type='number'
                            value={numberx}
                            onChange={(value) => {
                                setNumberx(value)
                            }}
                        />
                    </div>
                    <div className='col-span-6 '>
                        <BInput
                            title='Data text'
                            placeholder='Data text'
                            type='text'
                            value={textx}
                            onChange={(value) => {
                                setTextx(value)
                            }}
                        />
                    </div>

                </div>
            </div>

            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>

                <table className='Btable w-full'>
                    <thead>
                        <tr className="text-left">
                            <th className='w-[5%] text-center'>No</th>
                            <th className='w-[5%] text-center'>Act</th>
                            <th className='w-[30%]'>Name</th>
                            <th className='w-[50%]'>Address</th>
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
                                <td className=''>{item.address}</td>
                                <td className=''>
                                    <p className={`w-30
                                        ${item.status == "pending" ? "bg-b-yellow-5/50" : item.status == "approve" ? "bg-b-green-5/50" : "bg-b-red-5/50"
                                        }
                                        flex items-center justify-center rounded-2xl text-[10px] text-b-gray-6`}>
                                        {item.status}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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


            </div>


        </div>

    )
}

export default InputData


