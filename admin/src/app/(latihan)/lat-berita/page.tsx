'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"


interface ProductItem {
    id: number;
    title: string;
    description: string;
    images: string[];
}

interface ProductProps {
    products: ProductItem[];
    total: number;
    skip: number;
    limit: number;
}

const getData = async (number: number): Promise<ProductProps> => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${number}`)
    if (!response.ok) throw new Error("Gagal Mengambil data di server")
    return response.json();
}
const createData = async () => {

}
const updateData = async () => {

}
const deleteData = async () => {

}


const Page = () => {

    const queryClient = useQueryClient()
    const [numx, setNumx] = useState(10)

    const { data: dataProduct, isLoading, isError, error } = useQuery({
        queryKey: ['product', numx],
        queryFn: () => getData(numx)
    })

    return (
        <div className='flex flex-col w-full h-full bg-b-gray-1 py-5 px-20'>

            {
                isError && (
                    <div className='flex h-full w-full items-center justify-center '>
                        <p className='font-bold text-[100px]'>Terjadi error data!</p>
                        <p>{error.message}</p>
                    </div>
                )
            }

            {
                isLoading ? (
                    <div className='flex h-full w-full items-center justify-center '>
                        <p className='font-bold text-[100px]'>Loading Data!</p>
                    </div>
                ) : (

                    <div className='px-20 grid grid-cols-2 gap-2 w-full h-full '>


                        {
                            dataProduct?.products.map((item) => (
                                <div key={item.id} className='flex w-full gap-2 min-h-20 bg-b-gray-2 '>
                                    <div className='relative w-30 bg-b-gray-5 flex items-center justify-center'>
                                        <Image alt='Gambar berita' width={100} height={100} className='object-cover' src={item.images?.[0] ?? "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"} />
                                    </div>
                                    <div className='flex-4'>
                                        <p className='font-bold'>{item.title}</p>
                                        <p className='text-[12px] pt-2'>{item.description}</p>
                                    </div>
                                </div>

                            ))
                        }

                    </div>
                )
            }


            <div className='flex w-full items-center justify-center gap-1 mt-10 pb-5'>
                {
                    [...Array(10)].map((item, index) => (
                        <div key={index} onClick={() => setNumx(index + 1)} className='bg-red-400 w-10 h-10 border-2 rounded-sm flex items-center justify-center cursor-pointer'>
                            <p>{index + 1}</p>
                        </div>

                    ))
                }
            </div>


        </div>
    )
}

export default Page
