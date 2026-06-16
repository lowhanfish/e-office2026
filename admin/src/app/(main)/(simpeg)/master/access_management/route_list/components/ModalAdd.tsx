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
            <BModal title={`${action} Route Item`} openModal={open} setOpenModal={setOpen} size='md'>
                <div className='flex flex-col gap-2 p-4 over'>


                    <div className='grid grid-cols-12 gap-x-4 gap-y-1'>
                        <div className='col-span-12 md:col-span-12'>
                            <BInput
                                title='Title'
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
                                title='Route'
                                placeholder='Eg : /login'
                                type='text'
                                value={textx}
                                onChange={(value) => {
                                    setTextx(value)
                                }}
                            />
                        </div>
                        <div className='col-span-12 md:col-span-6'>
                            <BInput
                                title='Route'
                                placeholder='Eg : BsGear'
                                type='text'
                                value={textx}
                                onChange={(value) => {
                                    setTextx(value)
                                }}
                            />
                            <p className='text-[10px] text-b-gray-3'>
                                To view icon references, you can visit the page :
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-b-blue-3 hover:underline"
                                    href="https://react-icons.github.io/react-icons/icons/bs/"> https://react-icons.github.io/react-icons/icons/bs</a>
                            </p>
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
