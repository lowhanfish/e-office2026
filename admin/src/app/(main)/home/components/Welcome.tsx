import React from 'react'

const Welcome = () => {
    return (
        <div className='flex flex-col md:flex-row bg-linear-to-r from-b-gray-1 to-50% to-b-gray-2/90 shadow-sm rounded-[5] px-3 md:px-10 py-3 mt-2 text-b-gray-5'>
            <div className='flex-1 text-[12px] text-center md:text-left'>
                <p className='text-[20px] font-bold'>Good evening, Kiken S Batara</p>
                <p className='text-[12px]'>Ready to make today productive! 🚀</p>

                <div className='flex items-end text-[12px] text-center md:text-left'>

                    <div className='flex flex-row gap-1 items-center w-full justify-center md:justify-normal'>
                        <span className='text-[30px] font-bold text-b-blue-4 '>23:06</span>
                        <span className='text-[12px] '>PM</span>
                    </div>
                </div>
            </div>

            <div className='flex-1 flex flex-col pt-5 md:pt-0'>
                <div className='flex justify-center md:justify-end'>
                    <p className='text-[39px] font-bold '>28°C</p>
                </div>
                <div className='flex gap-2 text-[14px] justify-center md:justify-end '>
                    <p className='text-b-yellow-2 font-bold'>Sunny,</p>
                    <p>Kendari</p>

                </div>
                <p className='text-[12px] text-center md:text-right'>Friday, April 26, 2026</p>
            </div>
        </div>
    )
}

export default Welcome
