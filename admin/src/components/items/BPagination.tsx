'use client'

import { useMemo, Dispatch, SetStateAction } from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';


interface BPaginationProps {
    pageSelect: number,
    setPageSelect: Dispatch<SetStateAction<number>>,
    pageLimit: number,
    pageShow: number,
    dataLength?: number,
    onClick?: (page: number) => void
}

const BPagination = ({ pageSelect, setPageSelect, pageLimit, pageShow, dataLength, onClick }: BPaginationProps) => {

    // console.log(dataLength)
    const pageLength = useMemo(() => {
        if (!dataLength || !pageLimit) {
            return 1;
        }

        return Math.max(1, Math.ceil(dataLength / pageLimit));
    }, [dataLength, pageLimit]);

    const listPage = useMemo(() => {
        const safePageSelect = Math.min(Math.max(pageSelect, 1), pageLength);
        const startGroup = Math.floor((safePageSelect - 1) / pageShow) * pageShow + 1;
        const pages: number[] = [];

        for (let index = 0; index < pageShow; index++) {
            const targetPage = startGroup + index;
            if (targetPage <= pageLength) {
                pages.push(targetPage);
            }
        }

        return pages;
    }, [pageSelect, pageShow, pageLength]);

    const next = () => {
        if (pageSelect < pageLength) {
            const nextPage = pageSelect + 1
            setPageSelect(nextPage)
            if (onClick) {
                onClick(nextPage)
            }
        }
    }

    const back = () => {
        if (pageSelect > 1) {
            const prevPage = pageSelect - 1
            setPageSelect(prevPage)
            if (onClick) {
                onClick(prevPage)
            }
        }
    }

    if (dataLength && dataLength < pageLimit) {
        return null;
        // return (
        //     <><p>Kosong</p></>
        // );
    }

    return (
        <div className='flex flex-wrap gap-2 justify-center items-center'>
            <div className='flex gap-2'>
                <button
                    onClick={() => {
                        back();
                    }}
                    className='rounded-full border border-b-gray-4 hover:bg-b-gray-2 active:bg-b-gray-5 active:text-b-gray-3 h-7 w-7 flex justify-center items-center cursor-pointer'>
                    <BsChevronDoubleLeft />
                </button>
            </div>

            <div className='flex gap-1'>

                {
                    (!listPage.includes(1)) &&
                    (
                        <>
                            <button
                                onClick={() => {
                                    setPageSelect(1);
                                    if (onClick) {
                                        onClick(1)
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
                                    onClick(data)
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
                    (pageLength > pageShow && !listPage.includes(pageLength)) &&
                    (
                        <>
                            <p>...</p>
                            <button
                                onClick={() => {
                                    setPageSelect(pageLength);
                                    if (onClick) {
                                        onClick(pageLength)
                                    }
                                }}
                                className={`
                                rounded-full min-h-7 min-w-7 
                                 p-1 
                                ${pageSelect === pageLength ? 'text-b-gray-1 hover:text-b-gray-2 active:text-b-gray-5 bg-b-gray-6/80 active:bg-b-gray-1' : 'text-b-gray-5 active:bg-b-gray-6/80 active:text-b-gray-1 hover:bg-b-gray-2'}
                                cursor-pointer
                            `}>
                                <p className='text-[12px]'>{pageLength}</p>
                            </button>
                        </>
                    )
                }
            </div>


            <div className='flex gap-2'>
                <button
                    onClick={() => {
                        next()
                    }}
                    className='rounded-full border border-b-gray-4 hover:bg-b-gray-2 active:bg-b-gray-5 active:text-b-gray-3 h-7 w-7 flex justify-center items-center cursor-pointer'>
                    <BsChevronDoubleRight />
                </button>
            </div>


        </div>
    )
}

export default BPagination
