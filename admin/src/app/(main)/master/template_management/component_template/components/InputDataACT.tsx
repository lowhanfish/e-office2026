"use client"

import { useState } from 'react'
import CodeWrapper from './CodeWrapper'
import BInputAutocomplete from '@/components/items/BInputAutoComplete'

const dataArrObj = [
    {
        id: 1,
        name: "Kiken S batara, S.Si.,MT",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "reject"
    },
    {
        id: 2,
        name: "Riswan M Rizal. ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "pending"
    },
    {
        id: 3,
        name: "Muh. Hidayat Dermawan. ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "approve"
    },
    {
        id: 4,
        name: "Asrif Fajar Hidayat",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "pending"
    },
    {
        id: 5,
        name: "Fajar Syahputra, ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "pending"
    },
]

// API UNTUK USER
// https://fake-json-api.mock.beeceptor.com/users

const InputData = () => {

    const [data, setData] = useState<string | number>("")
    const [btype, getType] = useState<string | number>("")

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>

                <div className='col-span-4 '>
                    <BInputAutocomplete
                        title="Autocomplete text (Array Obj)"
                        placeholder="Cari data..."
                        DataObj={dataArrObj}
                        BSetValue={setData}
                        BGetText={getType}
                        BKey="id"
                        label="name"
                    />
                </div>
            </div>

            <div>
                <p className='text-[12px]'> Data Type : {btype}</p>
                <p className='text-[12px]'> Data selected : {data}</p>

            </div>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>
        </div>
    )
}

export default InputData


const codeString = `
"use client"

import { useState } from 'react'
import CodeWrapper from './CodeWrapper'
import BInputAutocomplete from '@/components/items/BInputAutoComplete'

const dataArrObj = [
    {
        id: 1,
        name: "Kiken S batara, S.Si.,MT",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "reject"
    },
    {
        id: 2,
        name: "Riswan M Rizal. ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "pending"
    },
    {
        id: 3,
        name: "Muh. Hidayat Dermawan. ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "approve"
    },
    {
        id: 4,
        name: "Asrif Fajar Hidayat",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "pending"
    },
    {
        id: 5,
        name: "Fajar Syahputra, ST",
        role: "Fullstack AI Engineer",
        address: "Jl. Beringin No. 31",
        status: "pending"
    },
]

// API UNTUK USER
// https://fake-json-api.mock.beeceptor.com/users

const InputData = () => {

    const [data, setData] = useState<string | number>("")
    const [btype, getType] = useState<string | number>("")

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-1 w-full'>

                <div className='col-span-4 '>
                    <BInputAutocomplete
                        title="Autocomplete text (Array Obj)"
                        placeholder="Cari data..."
                        DataObj={dataArrObj}
                        BSetValue={setData}
                        BGetText={getType}
                        BKey="id"
                        label="name"
                    />
                </div>
            </div>

            <div>
                <p className='text-[12px]'> Data Type : {btype}</p>
                <p className='text-[12px]'> Data selected : {data}</p>

            </div>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>
        </div>
    )
}

export default InputData
`
