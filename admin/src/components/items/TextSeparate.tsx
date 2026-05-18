import React from 'react'


interface TextSeparateProps {
    title: string
}

const TextSeparate = ({ title }: TextSeparateProps) => {
    return (
        <p className='p-3 text-[18px] text-b-gray-5 mt-3'>{title}</p>
    )
}

export default TextSeparate
