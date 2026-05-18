import { ReactNode } from 'react'
import { BsFileTextFill, BsGear } from "react-icons/bs";


interface BlistDocumentProps {
    icon?: ReactNode,
    title?: string,
    subtitle?: string,
    stamp?: string,
    onClick?: () => void
}

const BlistDocument = ({ icon, title, subtitle, stamp, onClick }: BlistDocumentProps) => {
    return (
        <div className='flex p-2 w-full bg-b-gray-2/70 rounded-[3]'>
            <div className='p-2 bg-b-gray-2 flex items-start'>
                {icon ?? <BsFileTextFill className='text-[30px] text-b-gray-4' />}
            </div>
            <div className='flex-1 bg-b-gray-2/50 p-2'>
                {
                    title && (
                        <p className='text-[12px] font-bold'>{title}</p>
                    )
                }

                {
                    subtitle && (
                        <p >{subtitle ?? 'Empty Subtitle'}</p>

                    )
                }

                {
                    stamp && (
                        <p className='text-[10px]'>{stamp ?? 'Empty Stamp'}</p>
                    )
                }

            </div>
            <div className='bg-b-gray-2/50 p-1'>
                <button
                    onClick={onClick}
                    className='bg-b-gray-3/80 hover:bg-b-gray-3/40 flex justify-center items-center rounded-full w-6 h-6 cursor-pointer'>
                    <BsGear className='text-b-gray-6' />
                </button>
            </div>
        </div>
    )
}

export default BlistDocument
