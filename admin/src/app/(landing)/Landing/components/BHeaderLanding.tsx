'use client'

import Image from 'next/image'
import React from 'react'



const BHeaderLanding = () => {
    return (
        <div className='flex flex-1 flex-col items-center justify-center'>

            <div>
                <Image alt='Logo Konsel' src="/images/logo_konsel.png" width={50} height={50} />
            </div>

            <p className='text-[15px] pt-1'>
                PEMERINTAH DAERAH KABUPATEN
            </p>
            <p className='text-[25px] -mt-2'>
                KONAWE SELATAN
            </p>
            <p className='text-[30px] font-bold bg-clip-text text-transparent bg-linear-to-r from-yellow-300 to-yellow-600'>
                DASHBOARD SUPER-APP
            </p>

        </div>
    )
}

export default BHeaderLanding
