import { useState, SetStateAction, Dispatch } from 'react'
import BModal from '@/components/items/BModal'
import BButton from '@/components/items/BButton'


interface ModalAddProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalDetail = ({ open, setOpen }: ModalAddProps) => {

    const [textx, setTextx] = useState<string | number>("")
    const [search, setSearch] = useState<string>("")
    const [listData, SetListData] = useState([
        {
            id: 1,
            name: "chats",
            SELECT: true,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 2,
            name: "companies",
            SELECT: true,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 3,
            name: "data_knowledge_base",
            SELECT: true,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 4,
            name: "history",
            SELECT: true,
            INSERT: false,
            UPDATE: false,
            DELETE: false
        },
        {
            id: 5,
            name: "sessions",
            SELECT: true,
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


    return (
        <div>
            <BModal title='Detail' openModal={open} setOpenModal={setOpen} size='md'>
                <div className='flex flex-col gap-2 p-4'>

                    <p>🟢 Pasdadasd dadkkln</p>
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
                                                {item.SELECT ? '✅' : '❌'}
                                            </div>
                                        </td>
                                        <td className=''>
                                            <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>
                                                {item.INSERT ? '✅' : '❌'}
                                            </div>
                                        </td>
                                        <td className=''>
                                            <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>
                                                {item.UPDATE ? '✅' : '❌'}
                                            </div>
                                        </td>
                                        <td className=''>
                                            <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>
                                                {item.DELETE ? '✅' : '❌'}
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
                    </div>
                </div>
            </BModal>
        </div>
    )
}

export default ModalDetail
