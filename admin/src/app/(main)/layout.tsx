import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import Image from 'next/image'
import { ReactNode } from 'react'



const layout = ({ children }: { children: ReactNode }) => {

    // setInterval(() => {
    //     console.log("jalan")
    // }, 3000)

    return (
        <div className='flex flex-col px-3 py-2 w-full h-full'>
            <Header />
            <div className='flex gap-2 flex-1 mt-2' >
                <SideBar />


                <div className='w-full h-full relative'>
                    <div className='absolute overflow-y-scroll w-full h-full px-1'>
                        {/* <Image
                            src="/images/bg-main2.jpg"
                            alt='Background'
                            priority
                            fill
                            className='object-cover -z-5 rounded-[20] opacity-90'

                        /> */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout
