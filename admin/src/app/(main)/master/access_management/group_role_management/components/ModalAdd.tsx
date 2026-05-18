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

    const AddData = () => {

    }

    return (
        <div>
            <BModal title={`${action} Database Access`} openModal={open} setOpenModal={setOpen} size='md'>
                <div className='flex flex-col gap-2 p-4 over'>
                    <div className='grid grid-cols-12 gap-x-4 gap-y-1'>
                        <div className='col-span-12 md:col-span-6'>
                            <BInput
                                title='Group Name'
                                placeholder='Title'
                                type='text'
                                value={textx}
                                onChange={(value) => {
                                    setTextx(value)
                                }}
                            />
                        </div>
                        <div className='col-span-12 md:col-span-6'>
                            <BInput
                                title='Group Role Database'
                                placeholder='Title'
                                type='text'
                                value={textx}
                                onChange={(value) => {
                                    setTextx(value)
                                }}
                            />
                        </div>
                        <div className='col-span-12'>
                            <div className='overflow-scroll  pt-2'>
                                <table className='Btable w-full'>
                                    <thead>
                                        <tr className="text-left">
                                            <th className='w-[5%] text-center'>No</th>
                                            <th className='w-[55%] text-center'>PAGE NAME</th>
                                            <th className='w-[10%]'>VIEW</th>
                                            <th className='w-[10%]'>INSERT</th>
                                            <th className='w-[10%] text-center'>UPDATE</th>
                                            <th className='w-[10%] text-center'>DELETE</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className='poppins'>
                                            <td className=''>
                                                <p className='text-center'>1</p>
                                            </td>
                                            <td className=''>
                                                cccc
                                            </td>
                                            <td className=''>
                                                <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>

                                                </div>
                                            </td>
                                            <td className=''>
                                                <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>

                                                </div>
                                            </td>
                                            <td className=''>
                                                <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>

                                                </div>
                                            </td>
                                            <td className=''>
                                                <div className='text-center font-semibold bg-b-gray-2 rounded-sm flex items-center justify-center p-1'>

                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                            </div>

                        </div>
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
