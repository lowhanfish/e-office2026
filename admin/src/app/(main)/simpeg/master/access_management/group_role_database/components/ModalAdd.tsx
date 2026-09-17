import { useState, SetStateAction, Dispatch } from 'react'
import BInput from '@/components/items/BInput'
import BModal from '@/components/items/BModal'
import { BsGear } from "react-icons/bs";
import BCheckBox from '@/components/items/BCheckBox';
import BButton from '@/components/items/BButton';


interface listDataItem {
    id: string | number, // Changed to allow number if your IDs are numeric
    name: string,
    SELECT: boolean,
    INSERT: boolean,
    UPDATE: boolean,
    DELETE: boolean
}

interface ModalAddProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    action: string;

}

const ModalAdd = ({ open, setOpen, action }: ModalAddProps) => {

    const [textx, setTextx] = useState<string | number>("")
    const [search, setSearch] = useState<string>("")
    const [listData, SetListData] = useState([
        {
            id: 1,
            name: "chats",
            SELECT: false,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 2,
            name: "companies",
            SELECT: false,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 3,
            name: "data_knowledge_base",
            SELECT: false,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 4,
            name: "history",
            SELECT: false,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 5,
            name: "sessions",
            SELECT: false,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 6,
            name: "user_tokens",
            SELECT: true,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 7,
            name: "users",
            SELECT: true,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        }

    ])


    const handleCheck = (index: number, key: string, value: boolean) => {
        const data = listData.map((item, i) => {
            if (i === index) {
                return { ...item, [key]: value }
            }
            return item
        })
        SetListData(data)
    }

    const AddData = () => {

    }

    return (
        <div>
            <BModal title={`${action} Database Access`} openModal={open} setOpenModal={setOpen} size='md'>
                <div className='flex flex-col gap-2 p-4 over'>
                    <BInput
                        title='Title'
                        placeholder='Title'
                        type='text'
                        value={textx}
                        onChange={(value) => {
                            setTextx(value)
                        }}
                    />

                    <div className='overflow-scroll'>
                        <table className='Btable w-full'>
                            <thead>
                                <tr className="text-left">
                                    <th className='w-[5%] text-center'>No</th>
                                    <th className='w-[55%] text-center'>TABLE NAME</th>
                                    <th className='w-[10%]'>SELECT</th>
                                    <th className='w-[10%]'>INSERT</th>
                                    <th className='w-[10%] text-center'>UPDATE</th>
                                    <th className='w-[10%] text-center'>DELETE</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listData.map((item, index) => (
                                    <tr key={item.name} className='poppins'>
                                        <td className=''>
                                            <p className='text-center'>{index + 1}</p>
                                        </td>
                                        <td className=''>
                                            {item.name}
                                        </td>
                                        <td className=''>
                                            <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>
                                                <BCheckBox
                                                    checked={item.SELECT}
                                                    value={item}
                                                    onChange={
                                                        (checked, value) => {
                                                            handleCheck(index, 'SELECT', checked)
                                                        }
                                                    }
                                                    size="sm" color='gray'
                                                />
                                            </div>
                                        </td>
                                        <td className=''>
                                            <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>
                                                <BCheckBox
                                                    checked={item.INSERT}
                                                    value={item}
                                                    onChange={
                                                        (checked, value) => {
                                                            handleCheck(index, 'INSERT', checked)
                                                        }
                                                    }
                                                    size="sm" color='blue'
                                                />
                                            </div>
                                        </td>
                                        <td className=''>
                                            <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>
                                                <BCheckBox
                                                    checked={item.UPDATE}
                                                    value={item}
                                                    onChange={
                                                        (checked, value) => {
                                                            handleCheck(index, 'UPDATE', checked)
                                                        }
                                                    }
                                                    size="sm" color='yellow'
                                                />
                                            </div>
                                        </td>
                                        <td className=''>
                                            <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>
                                                <BCheckBox
                                                    checked={item.DELETE}
                                                    value={item}
                                                    onChange={
                                                        (checked, value) => {
                                                            handleCheck(index, 'DELETE', checked)
                                                        }
                                                    }
                                                    size="sm" color='red'
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>



                    <div className='flex gap-2 justify-end py-2 border-y border-b-gray-2 items-center'>
                        <div className='w-25 h-full '>
                            <BButton
                                mode="glossy"
                                color='red'
                                size='md'
                                onClick={() => setOpen(false)}
                            >
                                <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>Cancel</p>
                            </BButton>
                        </div>

                        {
                            action == 'Add' ?
                                (
                                    <div className='w-25'>
                                        <BButton
                                            mode="glossy"
                                            color='gray'
                                            size='md'
                                            onClick={() => setOpen(false)}
                                        >
                                            <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>Add Data</p>
                                        </BButton>
                                    </div>

                                ) : (
                                    <div className='w-25'>
                                        <BButton
                                            mode="glossy"
                                            color='yellow'
                                            size='md'
                                            onClick={() => setOpen(false)}
                                        >
                                            <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>Edit Data</p>
                                        </BButton>
                                    </div>

                                )
                        }
                    </div>
                </div>


            </BModal>
        </div>
    )
}

export default ModalAdd
