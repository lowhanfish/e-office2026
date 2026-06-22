import React from 'react'


interface TextSeparateProps {
    title: string
}

const TextSeparate = ({ title }: TextSeparateProps) => {
    return (
        <p className='p-2 text-[18px] text-b-gray-5 mt-0'>{title}</p>
    )
}

export default TextSeparate
