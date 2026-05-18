import React from 'react'

interface TitleBarProps {
    title: string,
    subtitle: string
}

const TitleBar = ({ title, subtitle }: TitleBarProps) => {
    return (
        <div className='p-3 bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] '>
            <p className='font-poppins text-b-gray-4'>{title}</p>
            <p className='font-roboto text-[12px] text-b-gray-4 -mt-1 italic'>{subtitle}</p>
        </div>
    )
}

export default TitleBar
