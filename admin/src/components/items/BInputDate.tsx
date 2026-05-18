"use client"
import { useState, useEffect, Dispatch, SetStateAction } from 'react'


interface BInputProps {
    title?: string,
    value: string | number,
    placeholder?: string,
    setValue?: Dispatch<SetStateAction<any>>
    onChange: (value: any) => void
}

const BInputDate = ({ title, value, placeholder, setValue, onChange }: BInputProps) => {

    const getSetValue = (val: any) => {
        setValue && setValue(val)
    }
    return (
        <div className='w-full'>
            <span className='text-[12px] text-b-gray-3 font-roboto'>{title}</span>
            <input
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                className='w-full border bg-b-gray-2/35 border-b-gray-3/40 px-2 py-1.5 text-[14px] text-b-gray-4 rounded-[5]'
                type="date"
            />
        </div>
    )
}
export default BInputDate
