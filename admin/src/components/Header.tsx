'use client'
import { useSyncExternalStore } from 'react'
import { FaList } from 'react-icons/fa';
import { useTheme } from "next-themes"
import Image from 'next/image';
import { useStorex } from '@/store/useStorex';

const emptySubscribe = () => () => undefined

const Header = () => {
    // Zustand
    const togleIsSideBarOpen = useStorex(state => state.setIsSideBarOpen)

    // Themes
    const { resolvedTheme, setTheme } = useTheme()
    const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

    // 2. Cegah rendering sebelum mounted untuk menghindari error Hydration
    if (!mounted) {
        return <div className="h-15 w-full bg-b-gray-1"></div> // Placeholder kerangka (skeleton)
    }

    // `resolvedTheme` sudah menerjemahkan tema `system` menjadi light/dark
    // sesuai Appearance browser/OS yang sedang aktif.
    const isDark = resolvedTheme === "dark"
    const changeTheme = () => setTheme(isDark ? "light" : "dark")

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
                    <button
                        type="button"
                        onClick={changeTheme}
                        aria-label={`Ubah ke mode ${isDark ? 'terang' : 'gelap'}`}
                        title={`Ubah ke mode ${isDark ? 'terang' : 'gelap'}`}
                        className='md:flex hidden cursor-pointer justify-center items-center h-8 w-8 bg-b-gray-3/90 hover:bg-b-gray-3/70 rounded-full'
                    >
                        <span className='text-b-gray-6'>{isDark ? '🌙' : '☀️'}</span>
                    </button>

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
