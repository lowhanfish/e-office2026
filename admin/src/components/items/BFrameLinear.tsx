import { ReactNode } from 'react'

interface BFrameProps {
    children: ReactNode
}

const BFrameLinear = ({ children }: BFrameProps) => {
    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5]'>
            {children}
        </div>
    )
}

export default BFrameLinear
