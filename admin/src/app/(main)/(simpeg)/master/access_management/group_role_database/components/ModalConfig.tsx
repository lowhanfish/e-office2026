import { useState, SetStateAction, Dispatch } from 'react'
import BModal from '@/components/items/BModal'
import ModalAdd from './ModalAdd'
import ModalDetail from './ModalDetail'



interface ModalAddProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalConfig = ({ open, setOpen }: ModalAddProps) => {

    const [modalAdd, setModalAdd] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);

    return (
        <div>
            <BModal title='Configuration' openModal={open} setOpenModal={setOpen} size='xs'>
                <div className='flex flex-col gap-2 p-4'>
                    <button
                        onClick={() => setModalDetail(true)}
                        className='bg-b-blue-4 hover:bg-b-blue-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'>
                        Detail
                    </button>
                    <button
                        onClick={() => setModalAdd(true)}
                        className='bg-b-yellow-4 hover:bg-b-yellow-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'>
                        Edit
                    </button>
                    <button className='bg-b-red-4 hover:bg-b-red-5/70 cursor-pointer flex gap-2 justify-center items-center text-[12px] p-1.5 rounded-md shadow-md'>
                        Delete
                    </button>
                </div>


            </BModal>

            <ModalDetail
                open={modalDetail}
                setOpen={setModalDetail}
            />
            <ModalAdd
                open={modalAdd}
                setOpen={setModalAdd}
                action="Edit"
            />
        </div>
    )
}

export default ModalConfig
