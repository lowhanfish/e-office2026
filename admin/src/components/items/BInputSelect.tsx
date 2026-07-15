import React from 'react'

interface DataValue {
    id?: string | number;
    value: string | number | null;
}

interface BInputSelectProps {
    title?: string;
    datavalue?: string | number;
    options?: DataValue[]
    onChange: (value: string | number) => void
}


const BInputSelect = ({ title, datavalue, options, onChange }: BInputSelectProps) => {

    return (
        <div className='w-full'>
            {title && (
                <span className='text-[12px] text-b-gray-5 font-roboto'>{title}</span>
            )}

            {
                options && options.length > 0 && options != null && (
                    <select value={datavalue} onChange={(e) => onChange(e.target.value)} className='w-full border bg-b-gray-2/35 border-b-gray-3/40 pl-1 py-1.5 text-[14px] rounded-[5]' name="" id="">
                        <option>
                            {`- Pilih ${title && title}`}
                        </option>

                        {
                            options.map((item, index) => (
                                <option
                                    key={index}
                                    value={item?.id}>
                                    {item?.value}
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
