'use client'
import Image from 'next/image'
import { useState } from 'react'

import BButton from '@/components/items/BButton'
import Link from 'next/link'
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";


const FormLogin = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [typePassword, setTypePassword] = useState<string>('password');

    const LoginBtn = () => {

    }


    return (
        <div>
            <div className='bg-black/40 px-5 py-5 md:px-12 md:py-10 backdrop-blur-sm border-l-8 border-gray-600/20 h-full flex flex-col gap-1 rounded-[10] shadow-lg'>

                <div className='flex justify-center items-center'>
                    <Image
                        src="/images/icon_light.png"
                        alt='Logo'
                        width={200}
                        height={100}
                        className='object-cover'
                    />
                </div>

                <div className=''>
                    <div className='pt-5 md:pt-5'>
                        <p className='text-white text-[12px]'>Username</p>
                        <input type="text"
                            className='bg-white/2 backdrop-blur-sm h-10 w-full rounded-[20] px-3 border-2 border-b-blue-3 text-[12px] text-white'
                        />
                    </div>
                    <div className='pt-2'>
                        <p className='text-white text-[12px]'>Password</p>

                        <div className='flex justify-center items-center relative'>
                            <input type={typePassword}
                                className='bg-white/2 backdrop-blur-sm h-10 w-full rounded-[20] px-3 border-2 border-b-blue-3 text-[12px] text-white'
                            />


                            {
                                showPassword ?
                                    (
                                        <div onClick={() => { setTypePassword('password'); setShowPassword(!showPassword) }} className='absolute right-2 cursor-pointer h-7 w-7  flex justify-center items-center rounded-full'>
                                            <BsEyeSlashFill className='text-gray-100/70' />
                                        </div>
                                    ) :
                                    (
                                        <div onClick={() => { setTypePassword('text'); setShowPassword(!showPassword) }} className='absolute right-2 cursor-pointer h-7 w-7  flex justify-center items-center rounded-full'>
                                            <BsEyeFill className='text-gray-100/70' />
                                        </div>
                                    )
                            }
                        </div>
                    </div>

                    <div className='mt-5'>
                        <Link href="/home">
                            <BButton
                                mode="3d"
                                color='yellow'
                                size='lg'
                                onClick={() => LoginBtn()}
                            >
                                <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>
                                    LOGIN
                                </p>
                            </BButton>

                        </Link>

                    </div>


                    <div className='flex justify-center items-center gap-1 my-2'>

                    </div>




                </div>
            </div>
        </div>
    )
}

export default FormLogin
