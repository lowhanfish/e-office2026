'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"



interface ProductProps {
    products: any[];
    total: number;
    skip: number;
    limit: number;
}


const getData = async (number: number): Promise<ProductProps> => {
    const response = await fetch(`https://dummyjson.com/products?limit=${number}`)
    if (!response.ok) throw new Error("Gagal Mengambil data di server")
    return response.json();
}
const createData = async () => {

}
const updateData = async () => {

}
const deleteData = async () => {

}




const page = () => {

    const queryClient = useQueryClient()
    const [numx, setNumx] = useState(10)

    const { data: dataProduct, isLoading, isError, error } = useQuery({
        queryKey: ['product'],
        queryFn: () => getData(numx)
    })

    if (!isLoading) {
        console.log("========")
        console.log(dataProduct)
        console.log("========")

    }



    return (
        <div className='flex flex-col w-full h-full bg-b-gray-1 py-5'>

            {
                isLoading ? (
                    <div className='flex h-full w-full items-center justify-center '>
                        <p className='font-bold text-[100px]'>Loading Data!</p>
                    </div>
                ) : (

                    <div className='px-20 grid grid-cols-2 gap-2 w-full h-full '>




                        {
                            dataProduct?.products.map((item, index) => (
                                <div key={index} className='flex w-full gap-2 min-h-20 bg-b-gray-2 '>
                                    <div className='relative w-30 bg-b-gray-5 flex items-center justify-center'>
                                        <Image alt='Gambar berita' width={100} height={100} className='object-cover' src={item.images[0]} />
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


        </div>
    )
}

export default page
