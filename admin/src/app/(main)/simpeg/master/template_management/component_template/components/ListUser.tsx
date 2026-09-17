import React from 'react'
import BlistUser from '@/components/items/BlistUser';
import CodeWrapper from './CodeWrapper';


const ListUser = () => {

    var Arrayx = [
        {
            photo: "/images/photo.png",
            name: "Kiken S Batara",
            title: "AI Engineer",
            ig: "aaaaa",
            fb: "https://www.facebook.com/putryhapsa.hamencanamangidi",
            tiktok: "ccccc",
            wa: "ddddd",
        },
        {
            photo: "/images/photo2.png",
            name: "Riswan M Rizal",
            title: "FullStack Engginer",
            ig: "aaaaa",
            fb: "https://www.facebook.com/putryhapsa.hamencanamangidi",
            tiktok: "ccccc",
            wa: "ddddd",
        },
        {
            photo: "/images/photo3.png",
            name: "Hidayat Darmawan",
            title: "Backend Engineer",
            ig: "aaaaa",
            fb: "https://www.facebook.com/putryhapsa.hamencanamangidi",
            tiktok: "ccccc",
            wa: "ddddd",
        },
        {
            photo: "/images/photo4.png",
            name: "Asrif Fajar hidayat",
            title: "DevOps",
            ig: "aaaaa",
            fb: "https://www.facebook.com/putryhapsa.hamencanamangidi",
            tiktok: "ccccc",
            wa: "ddddd",
        },
    ]

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid w-full'>
                <div className='grid grid-cols-12 gap-2 md:gap-4'>
                    {
                        Arrayx.map((data, index) => (
                            <div key={index} className='col-span-12 md:col-span-3 w-full'>
                                <BlistUser photo={data.photo} name={data.name} title={data.title} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>
        </div>
    )
}


const codeString = `
import React from 'react'
import BlistUser from '@/components/items/BlistUser';

const ListUser = () => {
    return (
        <div className='flex bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid w-full'>
                <div className='grid grid-cols-12 gap-2 md:gap-4'>
                    {
                        [...Array(4)].map((_, index) => (
                            <div key={index} className='col-span-12 md:col-span-3 w-full'>
                                <BlistUser />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default ListUser    
    `



export default ListUser
