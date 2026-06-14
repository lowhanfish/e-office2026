import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const BBody = () => {

    const data = [
        {
            image: "/images/app_gali.png",
            title: "Gali Integral",
            url: "/"
        },
        {
            image: "/images/app_simpeg.png",
            title: "SimpegDa",
            url: "/"
        },
        {
            image: "/images/app_office.png",
            title: "e-Office",
            url: "/"
        },
        {
            image: "/images/app_absensi.png",
            title: "e-Absensi",
            url: "/"
        },
        {
            image: "/images/app_jdih.png",
            title: "JDIH",
            url: "/"
        },
    ]



    return (
        <div>
            <div className='flex justify-center items-center gap-5'>
                {
                    data.map((item, index) => (
                        <Link key={index} href={item.url}>
                            <div className='h-25 w-25 p-1.5 rounded-full border-2 border-amber-100'>
                                <div className='relative h-full w-full'>
                                    <Image alt='Icon App' src={item.image} className='object-cover aspect-auto rounded-full' fill />
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className='text-[12px]'>{item.title}</p>
                            </div>
                        </Link>

                    ))


                }

            </div>
        </div>
    )
}

export default BBody
