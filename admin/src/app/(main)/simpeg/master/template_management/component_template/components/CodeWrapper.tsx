"use client"

import { useEffect, useRef, useState } from 'react'
import { BsCheck2, BsChevronDown, BsCodeSlash, BsCopy } from 'react-icons/bs'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default function CodeWrapper({ codeString }: { codeString: string }) {
    const [copied, setCopied] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [copyError, setCopyError] = useState(false)
    const codeRef = useRef<HTMLElement>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (isShow && codeRef.current) {
            codeRef.current.removeAttribute('data-highlighted')
            hljs.highlightElement(codeRef.current)
        }
    }, [codeString, isShow])

    useEffect(() => () => {
        if (timerRef.current) clearTimeout(timerRef.current)
    }, [])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeString)
            setCopied(true)
            setCopyError(false)
            if (timerRef.current) clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => setCopied(false), 2000)
        } catch {
            setCopyError(true)
        }
    }

    return (
        <div className='min-w-0 overflow-hidden rounded-xl border border-b-gray-3/20'>
            <div className='flex flex-wrap items-center justify-between gap-3 bg-b-gray-2/30 px-4 py-3'>
                <button type='button' onClick={() => setIsShow(!isShow)} aria-expanded={isShow} className='flex cursor-pointer items-center gap-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4'>
                    <BsCodeSlash className='text-base' />
                    {isShow ? 'Tutup kode' : 'Lihat kode'}
                    <BsChevronDown className={`ml-1 transition-transform ${isShow ? 'rotate-180' : ''}`} />
                </button>
                <div className='flex items-center gap-4'>
                    <span className='hidden font-mono text-xs opacity-50 sm:inline'>TSX</span>
                    <button type='button' onClick={handleCopy} className='flex cursor-pointer items-center gap-2 rounded-lg border border-b-gray-3/25 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-b-gray-3/15'>
                        {copied ? <BsCheck2 /> : <BsCopy />}
                        {copied ? 'Tersalin' : 'Salin kode'}
                    </button>
                </div>
            </div>
            <span role='status' className='sr-only'>{copied ? 'Kode berhasil disalin' : ''}</span>
            {copyError && <p role='status' className='px-4 py-3 text-sm'>Kode belum dapat disalin. Buka kode dan salin secara manual.</p>}
            {isShow && (
                <pre className='max-h-[640px] overflow-auto bg-[#282c34] p-4 text-[13px] leading-7 sm:p-5'>
                    <code ref={codeRef} className='language-typescript'>{codeString}</code>
                </pre>
            )}
        </div>
    )
}
