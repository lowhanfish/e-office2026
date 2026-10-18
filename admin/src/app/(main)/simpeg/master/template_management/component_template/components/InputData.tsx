"use client"

import { useState } from 'react'
import DocumentationSection from './DocumentationSection'
import { componentDocumentation } from './componentDocumentation'
import BInput from '@/components/items/BInput'
import BInputFile from '@/components/items/BInputFile'
import BInputDate from '@/components/items/BInputDate'

const InputData = () => {

    const [numberx, setNumberx] = useState<number | string>(0)
    const [textx, setTextx] = useState<string | number>("")
    const [filex, setFilex] = useState<File | File[] | null>(null);
    const [datex, setDatex] = useState(new Date().toISOString().split('T')[0]);

    return (
        <DocumentationSection documentation={componentDocumentation.InputData} codeString={codeString}> 
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-5 w-full'>
                <div className='col-span-1 md:col-span-3 '>
                    <BInput
                        title='Angka'
                        placeholder='Angka'
                        type='number'
                        value={numberx}
                        onChange={(value) => {
                            setNumberx(value)
                        }}
                    />
                    <p className='text-xs pt-1.5'>Nilai: {numberx}</p>

                </div>
                <div className='col-span-1 md:col-span-3 '>
                    <BInput
                        title='Teks'
                        placeholder='Teks'
                        type='text'
                        value={textx}
                        onChange={(value) => {
                            setTextx(value)
                        }}
                    />
                    <p className='text-xs pt-1.5'>Nilai: {textx}</p>
                </div>
                <div className='col-span-1 md:col-span-3 '>
                    <BInputFile
                        accept='image/*'
                        placeholder='pilih file'
                        title='File Lampiran'
                        multiple={true}
                        onFileSelect={(file) => {
                            const finalData = (file instanceof FileList) ? Array.from(file) : file;
                            setFilex(finalData);
                            console.log(finalData);
                        }}
                    />
                    <div className='pt-1'>
                        {filex && (
                            (Array.isArray(filex) ? filex : [filex]).map((file, index) => (
                                <p key={index} className="text-xs">
                                    {file.name}
                                </p>
                            ))
                        )}
                    </div>
                </div>

                <div className='col-span-1 md:col-span-3 '>
                    <BInputDate
                        title='Tanggal'
                        placeholder='Tanggal'
                        value={datex}
                        onChange={
                            (value) => {
                                setDatex(value)
                                console.log(value)
                            }
                        }
                    />
                    <p className='text-xs pt-1.5'>Nilai: {datex}</p>
                </div>
            </div>
        </DocumentationSection>
    )
}

export default InputData

const codeString = `"use client"

import { useState } from 'react'
import BInput from '@/components/items/BInput'
import BInputFile from '@/components/items/BInputFile'
import BInputDate from '@/components/items/BInputDate'

const InputData = () => {

    const [numberx, setNumberx] = useState<number | string>(0)
    const [textx, setTextx] = useState<string | number>("")
    const [filex, setFilex] = useState<File | File[] | null>(null);
    const [datex, setDatex] = useState(new Date().toISOString().split('T')[0]);

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-5 w-full'>
                <div className='col-span-1 md:col-span-3 '>
                    <BInput
                        title='Angka'
                        placeholder='Angka'
                        type='number'
                        value={numberx}
                        onChange={(value) => {
                            setNumberx(value)
                        }}
                    />
                    <p className='text-xs pt-1.5'>Nilai: {numberx}</p>

                </div>
                <div className='col-span-1 md:col-span-3 '>
                    <BInput
                        title='Teks'
                        placeholder='Teks'
                        type='text'
                        value={textx}
                        onChange={(value) => {
                            setTextx(value)
                        }}
                    />
                    <p className='text-xs pt-1.5'>Nilai: {textx}</p>
                </div>
                <div className='col-span-1 md:col-span-3 '>
                    <BInputFile
                        accept='image/*'
                        placeholder='pilih file'
                        title='File Lampiran'
                        multiple={true}
                        onFileSelect={(file) => {
                            const finalData = (file instanceof FileList) ? Array.from(file) : file;
                            setFilex(finalData);
                            console.log(finalData);
                        }}
                    />
                    <div className='pt-1'>
                        {filex && (
                            (Array.isArray(filex) ? filex : [filex]).map((file, index) => (
                                <p key={index} className="text-xs">
                                    {file.name}
                                </p>
                            ))
                        )}
                    </div>
                </div>

                <div className='col-span-1 md:col-span-3 '>
                    <BInputDate
                        title='Tanggal'
                        placeholder='Tanggal'
                        value={datex}
                        onChange={
                            (value) => {
                                setDatex(value)
                                console.log(value)
                            }
                        }
                    />
                    <p className='text-xs pt-1.5'>Nilai: {datex}</p>
                </div>
            </div>
        </div>
    )
}

export default InputData`
