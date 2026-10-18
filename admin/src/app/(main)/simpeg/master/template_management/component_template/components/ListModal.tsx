"use client"

import { useState } from 'react'
import BModal from '@/components/items/BModal'
import BButton from '@/components/items/BButton'
import DocumentationSection from './DocumentationSection'
import { componentDocumentation } from './componentDocumentation'

export default function ListModal() {
    const [open, setOpen] = useState(false)
    return (
        <DocumentationSection documentation={componentDocumentation.ListModal} codeString={codeString}> 
            <BButton color='blue' size='md' onClick={() => setOpen(true)}>Buka dialog</BButton>
            <BModal title='Informasi dokumen' size='sm' openModal={open} setOpenModal={setOpen}>
                <div className='space-y-5 p-4'>
                    <p className='text-sm leading-7'>Gunakan area ini untuk menampilkan detail, formulir, atau tindakan tambahan sesuai kebutuhan halaman.</p>
                    <BButton color='gray' size='sm' onClick={() => setOpen(false)}>Selesai</BButton>
                </div>
            </BModal>
        </DocumentationSection>
    )
}

const codeString = `"use client"

import { useState } from 'react'
import BModal from '@/components/items/BModal'
import BButton from '@/components/items/BButton'

export default function ListModal() {
    const [open, setOpen] = useState(false)
    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <BButton color='blue' size='md' onClick={() => setOpen(true)}>Buka dialog</BButton>
            <BModal title='Informasi dokumen' size='sm' openModal={open} setOpenModal={setOpen}>
                <div className='space-y-5 p-4'>
                    <p className='text-sm leading-7'>Gunakan area ini untuk menampilkan detail, formulir, atau tindakan tambahan sesuai kebutuhan halaman.</p>
                    <BButton color='gray' size='sm' onClick={() => setOpen(false)}>Selesai</BButton>
                </div>
            </BModal>
        </div>
    )
}`
