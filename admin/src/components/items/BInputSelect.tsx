import React from 'react'

interface DataValue {
    id?: string | number;
    value: string | number;
    text: string
}

interface BInputSelectProps {
    title?: string;
    data?: DataValue[]
    onChange: (value: string | number) => void
}


const BInputSelect = ({ title, data, onChange }: BInputSelectProps) => {

    return (
        <div className='w-full'>
            {title && (
                <span className='text-[12px] text-b-gray-5 font-roboto'>{title}</span>
            )}

            {
                data && data.length > 0 && data != null && (
                    <select onChange={(e) => onChange(e.target.value)} className='w-full border bg-b-gray-2/35 border-b-gray-3/40 px-2 py-1.5 text-[14px] rounded-[5]' name="" id="">
                        {
                            data.map((item, index) => (
                                <option
                                    key={index}
                                    value={item?.value}>
                                    {item?.text}
                                </option>
                            ))
                        }
                    </select>
                )
            }

        </div>
    )
}

export default BInputSelect
