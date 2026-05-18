'use client'

import React from 'react'

const sizeMap: Record<string, string> = {
    xs: 'scale-120',
    sm: 'scale-135',
    md: 'scale-160',
    lg: 'scale-185',
    xl: 'scale-225',
}

const colorMap: Record<string, string> = {
    gray: "accent-gray-600",
    blue: "accent-blue-600",
    green: "accent-green-600",
    yellow: "accent-amber-600",
    red: "accent-red-500",
}


interface BRadioButtonProps<T> {
    title?: string,
    size?: string,
    color?: string,
    name?: string,
    checked: boolean,
    value: T,
    onChange: (value: T) => void
}

const BRadioButton = <T,>({ title, size, color, name, checked, value, onChange }: BRadioButtonProps<T>) => {
    return (
        <div className='flex gap-3'>
            <span className='text-[12px] text-b-gray-3 font-roboto'>{title}</span>
            <input
                className={`
                    ${size && sizeMap[size]} 
                    ${color && colorMap[color]} 
                    cursor-pointer 
                  
                `}
                type="radio"
                name={name}
                checked={checked}
                onChange={(e) => onChange(value)}

            />
        </div>
    )
}

export default BRadioButton
