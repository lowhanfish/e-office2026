"use client"

import { ReactNode, useEffect, useState } from 'react'
import { BsFillHouseFill, BsPlayFill, BsDot, BsFillLockFill } from "react-icons/bs";
import BButton from '@/components/items/BButton'
import routes from '@/utilities/routes';
import { useStorex } from '@/store/useStorex';
import Link from 'next/link';
import useCheckScreen from '@/hooks/useCheckScreen';
import { useRouter } from 'next/navigation'





const SideBar = () => {

    const router = useRouter()

    const screenx = useCheckScreen()
    const isSideBarOpen = useStorex(state => state.isSideBarOpen)
    const setIsSideBarStat = useStorex((state) => state.setIsSideBarStat)


    const LogOut = () => {
        router.push('/login');
    }


    useEffect(() => {
        if (screenx.screen === "Tablet" || screenx.screen === "Mobile") {
            setIsSideBarStat(false)
        } else {
            setIsSideBarStat(true)
        }

    }, [screenx])

    return (

        <div className={`
            transition-all duration-300 ease-in-out z-50
            ${(screenx.screen === "Mobile" || screenx.screen === "Tablet") && "fixed h-full"}
            ${isSideBarOpen ? 'translate-x-0 opacity-100 w-70 md:w-65' : '-translate-x-full opacity-0 w-0'}
        
        `}>

            <aside className={
                `
                fixed
                left-0 z-10
                transition-all duration-300 ease-in-out
                ${isSideBarOpen ? 'translate-x-0 ' : '-translate-x-full'}

                 ${(screenx.screen === "Mobile" || screenx.screen === "Tablet") ?
                    "bg-b-gray-1/70 backdrop-blur-sm"
                    :
                    "bg-linear-to-b from-b-gray-1 from-5% to-b-gray-1/20"

                }
            
                 shadow-md 
                w-full h-full rounded-[10] px-2 py-5 overflow-y-scroll`
            }>
                {
                    routes.map((data, index) => (
                        <div key={data.title} className=''>
                            <Submenu key={data.title} data={data} level={1} />
                        </div>
                    ))
                }

                <div className='flex pl-2 pr-1 items-center py-3 pb-20'>

                    <BButton
                        color='blue'
                        mode="glossy"
                        size='sm'
                        onClick={() => LogOut()}
                    >
                        <div className='flex gap-2'>
                            <BsFillLockFill />
                            <p className='text-white text-shadow-sm text-[12px]'>
                                Logout
                            </p>
                        </div>
                    </BButton>



                </div>


            </aside>
        </div>
    )
}


type dataProps = {
    title: string,
    children?: dataProps[],
    icon?: ReactNode,
    path?: string
}

const Submenu = ({ data, level }: { data: dataProps, level: number }) => {

    const [isDropDown, setIsDropDown] = useState(false);

    const getContainerClass = () => {
        if (level === 1) {
            return "flex pl-2 pr-1 items-center py-3 hover:bg-b-gray-2 rounded-[5px] cursor-pointer mb-1";
        }
        if (level === 2) {
            return "py-2 font-roboto pl-8 pr-1 font-bold hover:bg-b-gray-2 rounded-[5px] cursor-pointer";
        }
        // Level 3 dst
        return "py-2 font-roboto pl-8 pr-1 font-normal hover:bg-b-gray-2 rounded-[5px] cursor-pointer";
    }


    return (
        <div className="w-full">
            {/* Wrapper utama item menu */}


            {
                data.children && data.children.length > 0 ?
                    (
                        <button onClick={() => setIsDropDown(!isDropDown)} className={getContainerClass() + ` w-full`}>
                            <div className='flex items-center w-full'>


                                {/* Render Icon untuk Level 1 */}
                                {level === 1 && data.icon && (
                                    <div className="text-lg mr-2 text-b-gray-5">{data.icon}</div>
                                )}

                                {/* Render Dot untuk Level 3 */}
                                {level === 3 && (
                                    <div className='-ml-1.5'><BsDot className="text-b-gray-3" /></div>
                                )}

                                <p className={`flex-1 text-b-gray-5 flex justify-start ${level === 1 ? 'text-[13px]' : 'text-[12px]'}`}>
                                    {data.title}
                                </p>
                                <div className="ml-auto">
                                    <BsPlayFill className={`text-b-gray-3 text-[12px] ${isDropDown && "rotate-90"}`} />
                                </div>
                            </div>
                        </button>
                    )
                    :
                    (
                        <Link href={data.path || '#'}>
                            <div className={getContainerClass() + ` w-full pr-5 `}>
                                <div className='flex items-center w-full'>
                                    {level === 1 && data.icon && (
                                        <div className="text-lg mr-2 text-b-gray-5">{data.icon}</div>
                                    )}
                                    {level === 3 && (
                                        <div className='-ml-1.5'><BsDot className="text-b-gray-3" /></div>
                                    )}
                                    <p className={`flex-1 text-b-gray-5 flex justify-start ${level === 1 ? 'text-[13px]' : 'text-[12px]'}`}>
                                        {data.title}
                                    </p>


                                </div>
                            </div>
                        </Link>
                    )
            }



            {/* Rekursi: Render anak jika ada */}
            {
                <div className={`grid transition-all duration-300 ${isDropDown ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                        <div>
                            {data.children?.map((child) => (
                                <Submenu key={child.title} data={child} level={level + 1} />
                            ))}
                        </div>
                    </div>
                </div>


            }
        </div>
    )
}


export default SideBar
