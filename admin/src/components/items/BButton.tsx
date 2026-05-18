"use client"
import { ReactNode } from 'react'


interface BButtonProps {
    color: string,
    children: ReactNode,
    size: string,
    mode?: string,
    onClick: () => void,
}

const colorMap: Record<string, string> = {
    gray: "bg-gradient-to-r from-b-gray-5/30 via-b-gray-3 to-b-gray-5/50 text-b-gray-6 hover:from-b-gray-4/70 hover:to-b-gray-4/50 rounded-sm shadow-lg",
    blue: "bg-gradient-to-r from-b-blue-5 via-b-blue-6 to-b-blue-5 text-b-blue-6 hover:from-b-blue-4 hover:to-b-blue-4 rounded-sm shadow-lg",
    green: "bg-gradient-to-r from-b-green-5 via-b-green-6 to-b-green-5 text-b-green-6 hover:from-b-green-4 hover:to-b-green-4 rounded-sm shadow-lg",
    yellow: "bg-gradient-to-r from-b-yellow-4/90 via-b-yellow-5 to-b-yellow-4/90 text-b-yellow-6 hover:from-b-yellow-2 hover:to-b-yellow-2 rounded-sm shadow-lg",
    red: "bg-gradient-to-r from-b-red-3/90 via-b-red-5 to-b-red-3/90 text-b-red-6 hover:from-b-red-2 hover:to-b-red-2 rounded-sm shadow-lg",
}
const treeDMap: Record<string, string> = {
    gray: `bg-b-gray-3 transition-all rounded-lg border-b-[6px] border-b-gray-4 active:border-b-0 active:translate-y-1.5 hover:brightness-110 shadow-lg`,
    blue: `bg-b-blue-3 transition-all rounded-lg border-b-[6px] border-b-blue-4 active:border-b-0 active:translate-y-1.5 hover:brightness-110 shadow-lg`,
    green: `bg-b-green-3 transition-all rounded-lg border-b-[6px] border-b-green-4 active:border-b-0 active:translate-y-1.5 hover:brightness-110 shadow-lg`,
    yellow: `bg-b-yellow-4 transition-all rounded-lg border-b-[6px] border-b-yellow-5 active:border-b-0 active:translate-y-1.5 hover:brightness-110 shadow-lg`,
    red: `bg-b-red-4 transition-all rounded-lg border-b-[6px] border-b-red-6 active:border-b-0 active:translate-y-1.5 hover:brightness-110 rounded-sm shadow-lg`,
}
const glossyMap: Record<string, string> = {
    gray: `
    rounded-full text-white
    bg-linear-to-b from-gray-400 via-gray-500 to-gray-600
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(0,0,0,0.2)]
    border-t border-white/30
    hover:brightness-110 active:scale-95 transition-all
    `,
    blue: `
    rounded-full text-white
    bg-linear-to-b from-b-blue-6 via-b-blue-5 to-b-blue-4
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(0,0,0,0.2)]
    border-t border-white/30
    hover:brightness-110 active:scale-95 transition-all
    `,
    green: `
    rounded-full text-white
    bg-linear-to-b from-b-green-6 via-b-green-5 to-b-green-4
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(0,0,0,0.2)]
    border-t border-white/30
    hover:brightness-110 active:scale-95 transition-all
    `,
    yellow: `
    rounded-full text-white
    bg-linear-to-b from-b-yellow-6 via-b-yellow-5 to-b-yellow-4
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(0,0,0,0.2)]
    border-t border-white/30
    hover:brightness-110 active:scale-95 transition-all
    `,
    red: `
    rounded-full text-white
    bg-linear-to-b from-b-red-6 via-b-red-5 to-b-red-4
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(0,0,0,0.2)]
    border-t border-white/30
    hover:brightness-110 active:scale-95 transition-all
    `,
}

const neoMap: Record<string, string> = {
    gray: `
        font-bold border-2 border-b-gray-7 
        bg-b-gray-2 hover:bg-b-gray-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        transition-all active:shadow-none active:translate-x-0.5 active:translate-y-0.5
        `,
    blue: `
        font-bold border-2 border-b-gray-7 
        bg-b-blue-4 hover:bg-b-blue-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        transition-all active:shadow-none active:translate-x-0.5 active:translate-y-0.5
        `,
    green: `
        font-bold border-2 border-b-gray-7 
        bg-b-green-5 hover:bg-b-green-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        transition-all active:shadow-none active:translate-x-0.5 active:translate-y-0.5
        `,
    yellow: `
        font-bold border-2 border-b-gray-7 
        bg-b-yellow-4 hover:bg-b-yellow-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        transition-all active:shadow-none active:translate-x-0.5 active:translate-y-0.5
        `,
    red: `
        font-bold border-2 border-b-gray-7 
        bg-b-red-5 hover:bg-b-red-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] 
        transition-all active:shadow-none active:translate-x-0.5 active:translate-y-0.5
        `,
}


const neonMap: Record<string, string> = {
    gray: `
        bg-linear-to-r from-slate-700 via-gray-500 to-slate-800
        shadow-[0_0_20px_rgba(100,116,139,0.4)]
        hover:shadow-[0_0_35px_rgba(148,163,184,0.7)]
        border-t border-white/10
    `,
    blue: `
        bg-linear-to-r from-indigo-600 via-cyan-400 to-blue-700
        shadow-[0_0_20px_rgba(34,211,238,0.5)]
        hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]
        border-t border-cyan-200/20
    `,
    green: `
        bg-linear-to-r from-teal-600 via-emerald-400 to-green-700
        shadow-[0_0_20px_rgba(52,211,153,0.5)]
        hover:shadow-[0_0_40px_rgba(16,185,129,0.8)]
        border-t border-emerald-200/20
    `,
    yellow: `
        bg-linear-to-r from-orange-500 via-yellow-300 to-amber-600
        shadow-[0_0_20px_rgba(253,224,71,0.5)]
        hover:shadow-[0_0_40px_rgba(251,191,36,0.8)]
        border-t border-yellow-100/30
        text-gray-900
    `,
    red: `
        bg-linear-to-r from-purple-600 via-rose-500 to-red-700
        shadow-[0_0_20px_rgba(244,63,94,0.5)]
        hover:shadow-[0_0_40px_rgba(225,29,72,0.8)]
        border-t border-rose-200/20
    `,
}

const sizeMap: Record<string, string> = {
    xs: 'h-5',
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
    xl: 'h-13',
}



const BButton = ({ color, children, size, mode, onClick }: BButtonProps) => {
    return (
        <div className='w-full'>
            <button
                onClick={onClick}
                className={`
                flex flex-row gap-2 justify-center items-center
                
                ${mode == '3d' ?
                        treeDMap[color]
                        :
                        mode == 'glossy' ?
                            glossyMap[color]
                            :
                            mode == 'neo' ?
                                neoMap[color]
                                :
                                mode == 'neon' ?
                                    neonMap[color]
                                    :
                                    colorMap[color]
                    }
                ${sizeMap[size]}
                w-full
                transition-all duration-300 hover:scale-102
                cursor-pointer
                
            `}>
                {children}
            </button>


        </div>
    )
}

export default BButton
