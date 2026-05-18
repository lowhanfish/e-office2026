"use client"
import { useState, useEffect, useRef } from 'react';
import { BsCaretRight, BsCopy } from "react-icons/bs";
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface CodeWrapperProps {
    codeString: string
}

const CodeWrapper = ({ codeString }: CodeWrapperProps) => {
    const [copied, setCopied] = useState(false);
    const [isShow, setIsShow] = useState(false);


    const codeRef = useRef<HTMLElement>(null);




    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Gagal menyalin:', err);
        }
    };

    useEffect(() => {
        // Tambahkan pengecekan isShow agar highlight jalan saat div muncul
        if (isShow && codeRef.current) {
            codeRef.current.removeAttribute('data-highlighted');
            hljs.highlightElement(codeRef.current);
        }
    }, [codeString, isShow]);



    return (
        <div className="space-y-2">
            <div className='flex'>
                <div className='flex-1'>
                    <button onClick={() => setIsShow(!isShow)} className='flex gap-2 bg-b-gray-5 hover:bg-b-gray-4 text-b-gray-1 px-5 py-1 rounded-[5] cursor-pointer'>
                        <span className='text-[12px]'>View Source</span>
                        <BsCaretRight className={`${isShow && "rotate-90"}`} />
                    </button>
                </div>
                {
                    isShow && (
                        <div className="items-end">
                            <button
                                onClick={handleCopy}
                                className={`px-5 py-1 rounded-md text-[12px] transition-all ${copied ? 'bg-b-blue-3 text-white' : 'bg-neutral-800 text-slate-200 hover:bg-slate-700'
                                    }`}
                            >
                                {copied ? '☑️  Copied!' : '📝  Copy Code'}
                            </button>
                        </div>

                    )
                }

            </div>

            {
                isShow && (
                    <div className="rounded-lg overflow-hidden">
                        <pre className="rounded-[5] bg-b-gray-2 text-[12px] p-2 overflow-x-auto">
                            <code ref={codeRef} className="language-typescript rounded-[5]">
                                {codeString}
                            </code>
                        </pre>
                    </div>

                )
            }
        </div>
    )
}

export default CodeWrapper
