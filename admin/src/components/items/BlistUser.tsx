import Image from 'next/image'
import React from 'react'
import { BsInstagram, BsFacebook, BsWhatsapp, BsTwitterX } from "react-icons/bs";


type BlistUserProps = {
    photo: string,
    name: string,
    title: string
}

const BlistUser = ({ photo, name, title }: BlistUserProps) => {

    const routex = () => {

    }


    return (
        <div className='flex flex-col p-2 w-full bg-b-gray-1/70 backdrop-blur-md rounded-[5] border-5 border-b-gray-2 shadow-md'>
            <div className='flex items-center justify-center py-3'>

                <Image
                    className="border-4 border-b-gray-2 rounded-[50] hover:rounded-[30] scale-none hover:scale-115 transition-all duration-300 ease-in-out"
                    alt="Profile"
                    src={photo}
                    width={100}
                    height={100}
                />

            </div>
            <div className='flex flex-col py-1 items-center justify-center'>
                <p>{name}</p>
                <p className='font-roboto text-[13px]'>{title}</p>
            </div>
            <div className='mt-5 pb-3 flex flex-row gap-1 justify-center items-center'>
                <a href='#' className='transition-all duration-300 ease-in-out scale-none hover:scale-120 '>
                    <Image alt='Social Icon' src="/images/icon_ig.png" width={25} height={25} />
                    {/* <BsWhatsapp /> */}
                </a>
                <a href='#' className='transition-all duration-300 ease-in-out scale-none hover:scale-120 '>
                    <Image alt='Social Icon' src="/images/icon_fb.png" width={25} height={25} />
                    {/* <BsInstagram /> */}
                </a>
                <a href='#' className='transition-all duration-300 ease-in-out scale-none hover:scale-120 '>
                    <Image alt='Social Icon' src="/images/icon_tiktoks.png" width={25} height={25} />
                    {/* <BsTwitterX /> */}
                </a>
                <a href='#' className='transition-all duration-300 ease-in-out scale-none hover:scale-120 '>
                    <Image alt='Social Icon' src="/images/icon_wa.png" width={25} height={25} />
                    {/* <BsFacebook /> */}
                </a>
            </div>
            <div></div>
            <div></div>



        </div>
    )
}

export default BlistUser
