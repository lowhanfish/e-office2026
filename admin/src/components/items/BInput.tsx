"use client"
import { useState, useEffect, Dispatch, SetStateAction } from 'react'


interface BInputProps {
    title?: string,
    type: "number" | "text",
    value: string | number,
    placeholder?: string,
    setValue?: Dispatch<SetStateAction<any>>
    onChange: (value: string | number) => void
}

const BInput = ({ title, type, value, placeholder, setValue, onChange }: BInputProps) => {


    // const getSetValue = (val: any) => {
    //     const finalNumber = type === 'number' && val !== "" ? Number(val) : val
    //     setValue(finalNumber)
    // }
    return (
        <div className='w-full'>
            <span className='text-[12px] text-b-gray-5 font-roboto'>{title}</span>
            <input
                placeholder={placeholder}
                // onChange={(e) => getSetValue(e.target.value)}
                onChange={(e) => onChange(e.target.value)}
                step={type === 'number' ? "any" : undefined}
                value={value}
                className='w-full border bg-b-gray-2/35 border-b-gray-3/40 px-2 py-1.5 text-[14px] rounded-[5]'
                type={type}
            />
        </div>
    )
}

export default BInput
