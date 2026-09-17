'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import { fetchData } from '@/lib/api_secure'
import { useUrlStore } from '@/store/useUrlStore'

interface CheckAuthResponse {
    status: number
}

const Layout = ({ children }: { children: ReactNode }) => {
    const apiUrl = useUrlStore(state => state.URL.APP)
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        let isActive = true

        const checkAuth = async () => {
            try {
                const data = await fetchData<CheckAuthResponse>(`${apiUrl}/api/v1/auth/check-auth`)

                if (data.status !== 200) {
                    router.replace('/login')
                    return
                }

                if (isActive) setIsAuthenticated(true)
            } catch {
                router.replace('/login')
            }
        }

        checkAuth()

        return () => {
            isActive = false
        }
    }, [apiUrl, router])

    if (!isAuthenticated) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-b-gray-1'>
                <p className='text-sm text-b-gray-5'>Memeriksa sesi...</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col px-3 py-2 w-full h-full'>
            <Header />
            <div className='flex gap-2 flex-1 mt-2'>
                <SideBar />
                <div className='w-full h-full relative'>
                    <div className='absolute overflow-y-scroll w-full h-full px-1'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
