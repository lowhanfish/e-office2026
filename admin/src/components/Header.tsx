'use client'
import { useState, useEffect } from 'react'
import { FaList } from 'react-icons/fa';
import { useTheme } from "next-themes"
import Image from 'next/image';
import { useUrlStore } from '@/store/useUrlStore';
import { useStorex } from '@/store/useStorex';

const Header = () => {
    // Zustand
    const isSideBarOpen = useStorex(state => state.isSideBarOpen)
    const togleIsSideBarOpen = useStorex(state => state.setIsSideBarOpen)

    // Themes
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // 1. Pastikan komponen sudah "menempel" di browser
    useEffect(() => {
        setMounted(true)
    }, [])

    // 2. Cegah rendering sebelum mounted untuk menghindari error Hydration
    if (!mounted) {
        return <div className="h-15 w-full bg-b-gray-1"></div> // Placeholder kerangka (skeleton)
    }

    const changeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    // Variabel pembantu agar kode di bawah lebih bersih
    const isDark = theme === "dark"

    return (
        <div className='w-full'>
            <div className='flex items-center w-full rounded-[10px] h-15 bg-linear-to-r from-b-gray-1 from-5% to-b-gray-1/20 shadow-md'>

                <div className='flex gap-3 flex-1 px-5'>
                    <button onClick={togleIsSideBarOpen} className='flex cursor-pointer justify-center items-center h-8 w-8 bg-b-gray-2/90 hover:bg-b-gray-3/70 rounded-full'>
                        <FaList className='text-b-gray-6' />
                    </button>

                    {/* Render Image berdasarkan tema secara dinamis */}
                    <div className='w-30'>
                        <Image
                            priority
                            src={isDark ? "/images/icon_light.png" : "/images/icon_dark.png"}
                            alt='Logo'
                            width={500} // Beri angka besar sebagai resolusi maksimal
                            height={200}
                            style={{ width: '100%', height: 'auto' }} // Pakai 100% agar mengikuti ukuran div pembungkusnya
                            className='object-contain'
                        />

                    </div>
                </div>

                <div className='md:flex-1 flex justify-end px-5 gap-2'>
                    <div onClick={changeTheme} className='md:flex hidden cursor-pointer justify-center items-center h-8 w-8 bg-b-gray-3/90 hover:bg-b-gray-3/70 rounded-full'>
                        <span className='text-b-gray-6'>{isDark ? '☀️' : '🌙'}</span>
                    </div>

                    <div className='md:flex hidden cursor-pointer justify-center items-center h-8 w-8 bg-b-gray-2/90 hover:bg-b-gray-3/70 rounded-full'>
                        <span className='text-b-gray-6'>🛎️</span>
                    </div>

                    <div className='md:flex hidden gap-2 cursor-pointer justify-center items-center bg-b-gray-1/90 hover:bg-b-gray-3/70 rounded-md px-3'>
                        <img
                            className='rounded-full border-2 border-b-gray-2 w-6 h-6 object-cover'
                            src="https://avatars.githubusercontent.com/u/105328583?v=4"
                            alt="Profile"
                        />
                        <span className='font-bold text-[12px]'>Kiken S Batara</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header