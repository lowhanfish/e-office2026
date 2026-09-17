'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'

import BButton from '@/components/items/BButton'
import { callAPI } from '@/lib/api'
import { useUrlStore } from '@/store/useUrlStore'

interface LoginForm {
    username: string
    password: string
}

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message

    if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        return error.message
    }

    return 'Login gagal. Silakan coba kembali'
}

const FormLogin = () => {
    const loginUrl = useUrlStore(state => state.URL.LOGIN)
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<string>()
    const [isError, setIsError] = useState(false)
    const [form, setForm] = useState<LoginForm>({
        username: '',
        password: '',
    })

    const setItemForm = (key: keyof LoginForm, value: string) => {
        setForm(currentForm => ({
            ...currentForm,
            [key]: value,
        }))
    }

    const login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (isLoading) return

        const username = form.username.trim()
        if (!username || !form.password) {
            setIsError(true)
            setMessage('Username dan password wajib diisi')
            return
        }

        setIsLoading(true)
        setIsError(false)
        setMessage(undefined)

        try {
            await callAPI<{ message: string; token_type: string }>(loginUrl, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({ username, password: form.password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            router.replace('/landing')
            router.refresh()
        } catch (error: unknown) {
            setIsError(true)
            setMessage(getErrorMessage(error))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className='bg-black/40 px-5 md:px-12 py-7 md:py-10 mb-3 w-75 md:w-80 lg:w-100 backdrop-blur-sm border-l-8 border-gray-600/20 h-full flex flex-col gap-1 rounded-[10] shadow-lg'>
                <div className='flex justify-center items-center'>
                    <Image
                        src='/images/icon_light.png'
                        alt='Logo'
                        width={200}
                        height={100}
                        className='object-cover'
                    />
                </div>

                <form onSubmit={login}>
                    <div className='pt-5 md:pt-5'>
                        <label htmlFor='username' className='text-white text-[12px]'>Username</label>
                        <input
                            id='username'
                            name='username'
                            type='text'
                            autoComplete='username'
                            value={form.username}
                            disabled={isLoading}
                            onChange={event => setItemForm('username', event.target.value)}
                            className='bg-white/2 backdrop-blur-sm h-10 w-full rounded-[20] px-3 border-2 border-b-blue-3 text-[12px] text-white disabled:opacity-60'
                        />
                    </div>

                    <div className='pt-2'>
                        <label htmlFor='password' className='text-white text-[12px]'>Password</label>
                        <div className='flex justify-center items-center relative'>
                            <input
                                id='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                autoComplete='current-password'
                                value={form.password}
                                disabled={isLoading}
                                onChange={event => setItemForm('password', event.target.value)}
                                className='bg-white/2 backdrop-blur-sm h-10 w-full rounded-[20] px-3 border-2 border-b-blue-3 text-[12px] text-white disabled:opacity-60'
                            />

                            <button
                                type='button'
                                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                onClick={() => setShowPassword(current => !current)}
                                className='absolute right-2 cursor-pointer h-7 w-7 flex justify-center items-center rounded-full'
                            >
                                {showPassword ? (
                                    <BsEyeSlashFill className='text-gray-100/70' />
                                ) : (
                                    <BsEyeFill className='text-gray-100/70' />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <BButton
                            mode='3d'
                            color='yellow'
                            size='lg'
                            type='submit'
                            disabled={isLoading}
                        >
                            <p className='text-white font-semibold text-[13px] text-shadow-xs text-shadow-zinc-500'>
                                {isLoading ? 'MEMPROSES...' : 'LOGIN'}
                            </p>
                        </BButton>
                    </div>

                    {isError && (
                        <div className='mt-4 flex justify-center items-center gap-1 my-2 bg-red-500/50 px-2 py-1 rounded-md shadow-2xs'>
                            <p className='text-[10px] font-bold text-gray-100 text-center' role='alert'>
                                {message}
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default FormLogin
