'use client'

import React, { useState } from 'react'


interface BCheckBoxProps {
    color: string;
    size: string;
    title?: string;
    checked?: boolean;
    value?: any;
    onChange: (checked: boolean, value: string) => void;
}

const sizeMap: Record<string, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
}

const colorMap: Record<string, string> = {
    "gray": "focus:ring-b-gray-1 accent-b-gray-3",
    "blue": "focus:ring-b-blue-1 accent-b-blue-3",
    "green": "focus:ring-b-green-1 accent-b-green-3",
    "yellow": "focus:ring-b-yellow-1 accent-b-yellow-3",
    "red": "focus:ring-b-red-1 accent-b-red-3",
}


const BCheckBox = ({ color, size, title, checked, value, onChange }: BCheckBoxProps) => {

    return (
        <div className='flex flex-row items-center gap-1'>
            {
                title && (
                    <span className='text-[12px] text-b-gray-3 font-roboto'>{title}</span>
                )
            }
            <input
                type="checkbox"
                checked={checked}
                value={value}
                onChange={(e) => onChange(e.target.checked, e.target.value)}
                className={`${sizeMap[size]}  focus:ring-1 ${colorMap[color]} rounded cursor-pointer`}
            />
        </div>
    )
}

export default BCheckBox
