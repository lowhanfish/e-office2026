
"use client"

import { useState, Fragment } from 'react'
import BInput from '@/components/items/BInput'
import TextSeparate from '@/components/items/TextSeparate';
import { BsGear, BsFillPlayFill } from "react-icons/bs";
import BPagination from '@/components/items/BPagination'
import BFrameLinear from '@/components/items/BFrameLinear';

import ModalAdd from './components/ModalAdd';
import ModalConfig from './components/ModalConfig';
import ModalDetail from './components/ModalDetail';
import routex from '@/utilities/routes';




const page = () => {

    const [textx, setTextx] = useState<string | number>("")
    const [modalDetail, setModalDetail] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalConfig, setModalConfig] = useState(false);

    return (

        <div>
            <TextSeparate title='Route List Management' />
            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>

                    <div className='col-span-6 flex gap-1 justify-center items-center'>
                        <button
                            onClick={
                                () => setModalAdd(true)
                            }
                            className='bg-linear-to-r hover:bg-linear-to-b from-b-blue-4 to-b-blue-5/80 w-12 h-8.75 rounded-sm cursor-pointer'>
                            +
                        </button>
                        <BInput
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

            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2 overflow-scroll'>
                <table className='Btable w-full'>
                    <thead>
                        <tr>
                            <th className='w-[5%]'>
                                <p className='text-center'>No</p>
                            </th>
                            <th className='w-[5%]'>
                                <p className='text-center'>Act</p>
                            </th>
                            <th className='w-[50%]'>Route Name</th>
                            <th className='w-[40%]'>Route Link</th>
                        </tr>
                    </thead>

                    <tbody>
                        {routex.map((item) => (
                            <SubMenu
                                key={item.title}
                                item={item}
                                level={1}
                                onConfig={() => setModalConfig(true)}
                            />
                        ))}

                    </tbody>
                </table>

            </div>



            <ModalAdd
                open={modalAdd}
                setOpen={setModalAdd}
                action="Add"
            />

            <ModalConfig
                open={modalConfig}
                setOpen={setModalConfig}
            />

            <ModalDetail
                open={modalDetail}
                setOpen={setModalDetail}

            />



        </div>

    )
}

export default page

type dataProps = {
    title: string,
    children?: dataProps[],
    path?: string
}

const SubMenu = ({ item, level, onConfig }: { item: dataProps, level: number, onConfig: () => void }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)


    return (
        <Fragment>
            {/* 1. Render item itu sendiri dulu */}
            <tr className={`poppins`}>
                <td className=''>
                    <button
                        onClick={() => {
                            if (item.children && item.children.length > 0) {
                                setIsOpen(!isOpen)
                            }
                        }}
                        className='text-center text-[20px] w-full cursor-pointer'>

                        {

                            level === 1 ? (item.children && item.children?.length > 0) ?
                                <div className={`flex text-[30px] justify-center text-b-blue-4 ${isOpen && 'rotate-90'}`}><BsFillPlayFill /></div> :
                                <div className='flex text-[30px] justify-center text-b-gray-4'><BsFillPlayFill /></div> :
                                level === 2 ? (item.children && item.children?.length > 0) ?
                                    <div className={`flex text-[20px] justify-center text-b-green-2 ${isOpen && 'rotate-90'}`}><BsFillPlayFill /></div> :
                                    <div className={`flex text-[20px] justify-center text-b-gray-4 ${isOpen && 'rotate-90'}`}><BsFillPlayFill /></div> :
                                    <div className={`flex text-[10px] justify-center text-b-gray-4 ${isOpen && 'rotate-90'}`}><BsFillPlayFill /></div>

                        }


                        {/* {
                            level === 1 ? '🟢' :
                                level === 2 ? '◻️' :
                                    '🔘'} */}
                    </button>
                </td>
                <td className=''>
                    <div className='flex justify-center'>
                        <button onClick={onConfig} className='bg-b-gray-2/80 hover:bg-b-gray-2/50 flex justify-center items-center rounded-full w-6 h-6 cursor-pointer'>
                            <BsGear className='text-b-gray-6' />
                        </button>
                    </div>
                </td>
                <td className={`${level === 1 ? 'pl-0 font-bold' : level === 2 ? 'pl-7!' : 'pl-14! italic'}`}>
                    {level > 1 && '↳ '} {item.title}
                </td>
                <td className=''>
                    <p className='px-2 bg-b-gray-2 rounded-sm'>
                        {(item.children?.length == 0) && item.path}
                    </p>
                </td>
            </tr>

            {
                isOpen && (
                    item.children?.map((child: dataProps) => (
                        <SubMenu
                            key={child.title}
                            item={child}
                            level={level + 1}
                            onConfig={onConfig}
                        />
                    ))
                )

            }

            {/* 2. Baru kemudian render anak-anaknya secara rekursif */}
            { }
        </Fragment>
    )
}


