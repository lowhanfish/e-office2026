
"use client"

import { useState } from 'react'
import BInput from '@/components/items/BInput'
import { BsGear, BsGraphUpArrow, BsWhatsapp, BsInstagram, BsFacebook, BsTiktok, BsTelegram } from "react-icons/bs";
import BFrame from '@/components/items/BFrame';

import Welcome from './components/Welcome';
import LineChart from './components/LineChart';
import RadarChart from './components/RadarChart';
import FrequentRAG from './components/FrequentRAG';




const InputData = () => {

    const [numberx, setNumberx] = useState<number | string>(0)
    const [textx, setTextx] = useState<string | number>("")



    return (

        <div className=''>
            <div className='p-3 mt-3 text-b-gray-5'>
                <div className='flex items-center gap-3 text-[35px]'>
                    <BsGear />
                    <p>Dashboard</p>
                </div>
                <p className='text-[12px]'>Monitor key metrics and manage your platform</p>
            </div>

            <Welcome />


            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>
                    <div className='col-span-6 '>
                        <BInput
                            title='Data number'
                            placeholder='Data number'
                            type='number'
                            value={numberx}
                            onChange={(value) => {
                                setNumberx(value)
                            }}
                        />
                    </div>
                    <div className='col-span-6 '>
                        <BInput
                            title='Data text'
                            placeholder='Data text'
                            type='text'
                            value={textx}
                            onChange={(value) => {
                                setTextx(value)
                            }}
                        />
                    </div>

                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-0 md:gap-3'>

                <div className='pt-2 flex-1'>
                    <BFrame>
                        <div className='flex flex-row h-full p-2'>
                            <div className='p-2 rounded-[5] border-2 border-b-gray-2/50 '>
                                <BsWhatsapp className='w-10 h-10 text-b-green-1/70' />
                            </div>
                            <div className=''>
                                <div className='h-full pl-5 pr-1 flex flex-col items-center justify-center'>
                                    <p className='w-full text-[12px]'>WhatsApp Session</p>
                                    <p className='w-full -mt-2 text-[35px] font-bold text-b-green-1/70'>78</p>

                                </div>
                            </div>
                        </div>
                    </BFrame>
                </div>
                <div className='pt-2 flex-1'>
                    <BFrame>
                        <div className='flex flex-row h-full p-2'>
                            <div className='p-2 rounded-[5] border-2 border-b-gray-2/50 '>
                                <BsInstagram className='w-10 h-10 text-b-red-1/70' />
                            </div>
                            <div className=''>
                                <div className='h-full pl-5 pr-1 flex flex-col items-center justify-center'>
                                    <p className='w-full text-[12px]'>Instagram Session</p>
                                    <p className='w-full -mt-2 text-[35px] font-bold text-b-red-1/70'>42</p>

                                </div>
                            </div>
                        </div>
                    </BFrame>
                </div>
                <div className='pt-2 flex-1'>
                    <BFrame>
                        <div className='flex flex-row h-full p-2'>
                            <div className='p-2 rounded-[5] border-2 border-b-gray-2/50 '>
                                <BsFacebook className='w-10 h-10 text-b-blue-1/70' />
                            </div>
                            <div className=''>
                                <div className='h-full pl-5 pr-1 flex flex-col items-center justify-center'>
                                    <p className='w-full text-[12px]'>Session TikTok</p>
                                    <p className='w-full -mt-2 text-[35px] font-bold text-b-blue-1/70'>78</p>

                                </div>
                            </div>
                        </div>
                    </BFrame>
                </div>
                <div className='pt-2 flex-1'>
                    <BFrame>
                        <div className='flex flex-row h-full p-2'>
                            <div className='p-2 rounded-[5] border-2 border-b-gray-2/50 '>
                                <BsTiktok className='w-10 h-10 text-b-gray-5/70' />
                            </div>
                            <div className=''>
                                <div className='h-full pl-5 pr-1 flex flex-col items-center justify-center'>
                                    <p className='w-full text-[12px]'>Session WhatsApp</p>
                                    <p className='w-full -mt-2 text-[35px] font-bold text-b-gray-5'>120</p>

                                </div>
                            </div>
                        </div>
                    </BFrame>
                </div>

                <div className='pt-2 flex-1'>
                    <BFrame>
                        <div className='flex flex-row h-full p-2'>
                            <div className='p-2 rounded-[5] border-2 border-b-gray-2/50 '>
                                <BsTelegram className='w-10 h-10 text-b-blue-4/70' />
                            </div>
                            <div className=''>
                                <div className='h-full pl-5 pr-1 flex flex-col items-center justify-center'>
                                    <p className='w-full text-[12px]'>Session Telegram</p>
                                    <p className='w-full -mt-2 text-[35px] font-bold text-b-blue-4'>12</p>

                                </div>
                            </div>
                        </div>
                    </BFrame>
                </div>



            </div>

            <div className='p-3 mt-7 text-b-gray-5'>
                <div className='flex font-semibold items-center gap-3 text-[18px] md:text-[20px]'>
                    <BsGraphUpArrow />
                    <p>Performance Metrics Chart</p>
                </div>
                <p className='text-[12px]'>Your Operational Performance Analytics</p>
            </div>
            <div className='grid grid-cols-12 gap-3 pt-2'>
                <div className='col-span-12 md:col-span-8 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                    <LineChart />
                </div>
                <div className='col-span-12 md:col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                    <RadarChart />
                </div>
            </div>

            <div className='p-3 mt-7 text-b-gray-5'>
                <div className='flex font-semibold items-center gap-3 text-[18px] md:text-[20px]'>
                    <BsGraphUpArrow />
                    <p>Frequent RAG Assets</p>
                </div>
                <p className='text-[12px]'>Top 10 files retrieved for context.</p>
            </div>

            <FrequentRAG />



        </div>

    )
}

export default InputData


