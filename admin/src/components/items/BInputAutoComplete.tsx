"use client"
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'

interface BInputAutocompleteProps {
    title: string;
    placeholder: string;
    BSetValue: Dispatch<SetStateAction<string | number>>;
    BGetText: Dispatch<SetStateAction<string | number>>;
    DataObj: any;
    label: string;
    BKey: string | number
}

const BInputAutocomplete = ({ title, placeholder, BSetValue, BGetText, DataObj, label, BKey }: BInputAutocompleteProps) => {

    const boxRef = useRef<HTMLDivElement>(null)
    const [option, setOption] = useState<any>([])
    const [showData, setShowData] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [highlightIndex, setHighlightIndex] = useState<number>(-1)
    const [showClear, setShowClear] = useState<boolean>(false)

    const getListData = (e: any) => {
        setText(e)
        BGetText(e)

        if (e.trim() !== "") {
            const search = DataObj.filter((item: any) => {
                return item[label].toLowerCase().includes(e.toLowerCase())
            })
                .map((item: any) => (item))
            setOption(search)
        } else {
            setOption(DataObj)
        }
    }

    const handleClickACT = () => {
        setShowData(true)
    }

    const selectValue = (item: any) => {
        setShowClear(true)
        setShowData(false);
        setText(item[label]);
        setHighlightIndex(-1);
        if (BSetValue) {
            BSetValue(item[BKey]);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (!showData) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightIndex((prev) => (prev < option.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightIndex((prev) => (prev > 0 ? prev - 1 : option.length - 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightIndex >= 0 && highlightIndex < option.length) {
                selectValue(option[highlightIndex]);
            }
        } else if (e.key === 'Escape') {
            setShowData(false);
            setHighlightIndex(-1);
        }
    }

    const handleClearData = (e: any) => {

        console.log(e.target.value)
        if (e.target.value) {
            console.log("data ada")
            getListData(e.target?.value)
            setShowClear(true)
        } else {
            console.log("data kosong")
            setShowClear(false)
        }
    }

    const clearTextData = () => {
        BSetValue("")
        setText("");
        setShowData(true);
        setShowClear(false)
        getListData("")
    }

    useEffect(() => {
        const handleClickOutACT = (e: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
                setShowData(false)
            }
        }
        window.addEventListener("mousedown", handleClickOutACT)
        return () => {
            window.removeEventListener("mousedown", handleClickOutACT)
        }

    }, [])

    useEffect(() => {
        // handleClearData();
        setOption(DataObj)
    }, [])

    return (
        <div>
            <div ref={boxRef} className='w-full relative'>
                <span className='text-[12px] text-b-gray-3 font-roboto'>{title}</span>
                <div className='relative flex justify-center items-center'>
                    <input
                        onClick={handleClickACT}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleClearData}
                        placeholder={placeholder}
                        value={text}
                        className='w-full border bg-b-gray-2/35 border-b-gray-3/40 px-2 py-1.5 text-[14px] rounded-[5]'
                        onChange={(e) => getListData(e.target?.value)}
                    />
                    {
                        showClear && (
                            <button
                                onClick={() => clearTextData()}
                                className='absolute right-2 
                                    text-[12px] font-semibold text-b-gray-4 
                                    rounded-full bg-b-gray-2 
                                    hover:bg-b-gray-2/70 w-6 h-6 
                                    cursor-pointer shadow-sm'>
                                x
                            </button>
                        )
                    }

                </div>
                {
                    showData && (
                        <div className='absolute bg-b-gray-3 w-full mt-2 rounded-[6] z-50 shadow-lg'>
                            {
                                option.map((item: any, index: any) => (
                                    <div onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        selectValue(item);
                                    }} key={index} className={`${index === highlightIndex ? 'bg-b-gray-1' : 'bg-b-gray-2'} hover:bg-b-gray-1 flex flex-col m-1 p-1 rounded-[3] cursor-pointer`}>
                                        <div className='text-[14px]'>{item[label]}</div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default BInputAutocomplete