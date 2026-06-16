"use client"
import { useState } from 'react'
import CodeWrapper from './CodeWrapper'
import ChartBar from '@/components/items/chart/ChartBar'
import ChartBarGroup from '@/components/items/chart/ChartBarGroup'
import ChartVolume from '@/components/items/chart/ChartVolume'
import { ChartRadar } from '@/components/items/chart/ChartRadar'
import { ChartDougnut } from '@/components/items/chart/ChartDougnut'

const labels_volume = Array.from({ length: 5 }, (_, i) => `${i.toString().padStart(2, '0')}:00`); // ['00:00', '01:00', '02:00', dst...]
const datasets = [
    {
        fill: true,
        label: 'Total Chat',
        data: [10, 9, 7, 5, 6],
    },
    {
        fill: true,
        label: 'Berhasil Dijawab (RAG)',
        data: [9, 8, 7, 4, 3],
    },
]

const ListButton = () => {

    const [list, setList] = useState([31, 21, 13, 15, 24]);
    const [labels, setLabels] = useState(['WhatsAppz', 'FaceBook', 'Instagram', 'TikTok', 'Telegram']);

    return (
        <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 w-full'>

                <div className='col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                    <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                        <p className='text-b-gray-4'>Bar Chart</p>
                    </div>
                    <ChartBar item='Session' list={list} labels={labels} />
                </div>

                <div className='col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                    <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                        <p className='text-b-gray-4'>Grouped Bar Chart</p>
                    </div>
                    <ChartBarGroup
                        labels={labels}
                    />
                </div>
                <div className='col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                    <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                        <p className='text-b-gray-4'>Grouped Bar Chart</p>
                    </div>
                    <ChartDougnut
                        list={list} labels={labels} item='Session'
                    />
                </div>

                <div className='col-span-8 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                    <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                        <p className='text-b-gray-4'>Line Chart</p>
                    </div>
                    <ChartVolume
                        datasets={datasets}
                        labels_volume={labels_volume}
                    />
                </div>
                <div className='col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                    <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                        <p className='text-b-gray-4'>Radar Chart</p>
                    </div>
                    <ChartRadar
                        labels={labels}
                        datasets={datasets}
                    />
                </div>

            </div>

            <div className='mt-5'>
                <CodeWrapper codeString={codeString} />
            </div>

        </div>
    )
}

export default ListButton

const codeString = `
    "use client"
    import { useState } from 'react'
    import CodeWrapper from './CodeWrapper'
    import ChartBar from '@/components/items/chart/ChartBar'
    import ChartBarGroup from '@/components/items/chart/ChartBarGroup'
    import ChartVolume from '@/components/items/chart/ChartVolume'
    import { ChartRadar } from '@/components/items/chart/ChartRadar'
    import { ChartDougnut } from '@/components/items/chart/ChartDougnut'

    const labels_volume = Array.from({ length: 5 }, (_, i) => '00:00'; // ['00:00', '01:00', '02:00', dst...]
    const datasets = [
        {
            fill: true,
            label: 'Total Chat',
            data: [10, 9, 7, 5, 6],
        },
        {
            fill: true,
            label: 'Berhasil Dijawab (RAG)',
            data: [9, 8, 7, 4, 3],
        },
    ]

    const ListButton = () => {

        const [list, setList] = useState([31, 21, 13, 15, 24]);
        const [labels, setLabels] = useState(['WhatsAppz', 'FaceBook', 'Instagram', 'TikTok', 'Telegram']);

        return (
            <div className='flex flex-col bg-linear-to-r from-b-gray-1 to-50% to-b-gray-1/40 shadow-sm rounded-[5] px-3 py-3 mt-2'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 w-full'>

                    <div className='col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                        <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                            <p className='text-b-gray-4'>Bar Chart</p>
                        </div>
                        <ChartBar item='Session' list={list} labels={labels} />
                    </div>

                    <div className='col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                        <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                            <p className='text-b-gray-4'>Grouped Bar Chart</p>
                        </div>
                        <ChartBarGroup
                            labels={labels}
                        />
                    </div>
                    <div className='col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                        <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                            <p className='text-b-gray-4'>Grouped Bar Chart</p>
                        </div>
                        <ChartDougnut
                            list={list} labels={labels} item='Session'
                        />
                    </div>

                    <div className='col-span-8 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                        <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                            <p className='text-b-gray-4'>Line Chart</p>
                        </div>
                        <ChartVolume
                            datasets={datasets}
                            labels_volume={labels_volume}
                        />
                    </div>
                    <div className='col-span-4 flex flex-col gap-2 bg-b-gray-1 p-2 rounded-[10] border border-b-gray-6/10'>
                        <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                            <p className='text-b-gray-4'>Radar Chart</p>
                        </div>
                        <ChartRadar
                            labels={labels}
                            datasets={datasets}
                        />
                    </div>

                </div>

                <div className='mt-5'>
                    <CodeWrapper codeString={codeString} />
                </div>

            </div>
        )
    }

    export default ListButton
`