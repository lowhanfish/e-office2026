'use client'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";


interface BPaginationProps {
    pageSelect: number,
    setPageSelect: Dispatch<SetStateAction<number>>,
    pageLimit: number,
    dataLength: number,
    onClick?: () => void
}



const BPagination = ({ pageSelect, setPageSelect, pageLimit, dataLength, onClick }: BPaginationProps) => {

    // const [pageSelect, setPageSelect] = useState<number>(1);
    // const [pageLimit, setPageLimit] = useState<number>(4)
    // const [dataLength, setDataLength] = useState<number>(99999)

    const [listPage, setListPage] = useState<number[]>([])

    // const total_page = Math.ceil(dataLength/pageLimit);
    // const start_number = pageLimit*pageSelect-(pageLimit-1) // page dimulai dari

    const next = () => {
        if (pageSelect < dataLength) {
            setPageSelect(pageSelect + 1)
        }
    }

    const back = () => {
        if (pageSelect > 1) {
            setPageSelect(pageSelect - 1)
        }
    }

    const pushArray = () => {
        // Tentukan angka awal grup (Start Group)
        // Jika pageSelect 1-4, startGroup = 1
        // Jika pageSelect 5-8, startGroup = 5
        // Jika pageSelect 9, startGroup = 9
        const startGroup = Math.floor((pageSelect - 1) / pageLimit) * pageLimit + 1;

        let arr = [];
        for (let i = 0; i < pageLimit; i++) {
            const targetPage = startGroup + i;
            if (targetPage <= dataLength) {
                arr.push(targetPage);
            }
        }

        setListPage(arr);
    };

    useEffect(() => {
        pushArray()
    }, [pageSelect])



    return (
        <div className='flex flex-wrap gap-2 justify-center items-center'>

            <div className='flex gap-2'>
                <button
                    onClick={() => {
                        back();
                        if (onClick) {
                            onClick()
                        }
                    }}
                    className='rounded-full border-1 border-b-gray-4 hover:bg-b-gray-2 active:bg-b-gray-5 active:text-b-gray-3 h-7 w-7 flex justify-center items-center cursor-pointer'>
                    <BsChevronDoubleLeft />
                </button>
            </div>

            <div className='flex gap-0.5'>

                {
                    (!listPage.includes(1)) &&
                    (
                        <>
                            <button
                                onClick={() => {
                                    setPageSelect(1);
                                    if (onClick) {
                                        onClick()
                                    }
                                }}
                                className={`
                                rounded-full min-h-7 min-w-7 
                                 p-1 
                                ${pageSelect === 1 ? 'text-b-gray-1 hover:text-b-gray-2 active:text-b-gray-5 bg-b-gray-6/80 active:bg-b-gray-1' : 'text-b-gray-5 active:bg-b-gray-6/80 active:text-b-gray-1 hover:bg-b-gray-2'}
                                cursor-pointer
                            `}>
                                <p className='text-[12px]'>1</p>
                            </button>
                            <p>...</p>

                        </>
                    )
                }

                {

                    listPage.map((data, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setPageSelect(data);
                                if (onClick) {
                                    onClick()
                                }
                            }}
                            className={`
                                rounded-full min-h-7 min-w-7 
                                 p-1 
                                ${pageSelect === data ? 'text-b-gray-1 hover:bg-b-gray-6 active:text-b-gray-5 bg-b-gray-6/80 active:bg-b-gray-1' : 'text-b-gray-5 active:bg-b-gray-6/80 active:text-b-gray-1 hover:bg-b-gray-2'}
                                cursor-pointer
                            `}>
                            <p className='text-[12px]'>{data}</p>
                        </button>
                    ))

                }
                {
                    (dataLength > pageLimit && !listPage.includes(dataLength)) &&
                    (
                        <>
                            <p>...</p>
                            <button
                                onClick={() => {
                                    setPageSelect(dataLength);
                                    if (onClick) {
                                        onClick()
                                    }
                                }}
                                className={`
                                rounded-full min-h-7 min-w-7 
                                 p-1 
                                ${pageSelect === dataLength ? 'text-b-gray-1 hover:text-b-gray-2 active:text-b-gray-5 bg-b-gray-6/80 active:bg-b-gray-1' : 'text-b-gray-5 active:bg-b-gray-6/80 active:text-b-gray-1 hover:bg-b-gray-2'}
                                cursor-pointer
                            `}>
                                <p className='text-[12px]'>{dataLength}</p>
                            </button>

                        </>
                    )
                }

            </div>


            <div className='flex gap-2'>
                <button
                    onClick={() => {
                        next()
                        if (onClick) {
                            onClick()
                        }
                    }}
                    className='rounded-full border-1 border-b-gray-4 hover:bg-b-gray-2 active:bg-b-gray-5 active:text-b-gray-3 h-7 w-7 flex justify-center items-center cursor-pointer'>
                    <BsChevronDoubleRight />
                </button>
            </div>


            {/* <p>{pageSelect}</p> */}


        </div>
    )
}

export default BPagination
