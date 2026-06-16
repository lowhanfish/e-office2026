import { useState } from 'react'

import ChartVolume from '@/components/items/chart/ChartVolume'

type LineChartProps = {
    title: string
}

const LineChart = ({ title }: LineChartProps) => {

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


    return (
        <>
            <div className='flex justify-center items-center border-[0.1] border-b-gray-2 mb-2 bg-linear-to-r from-b-gray-2/50 to-b-gray-1 rounded-sm'>
                <p className='text-b-gray-4'>{title}</p>
            </div>

            <ChartVolume
                datasets={datasets}
                labels_volume={labels_volume}

            />
        </>
    )
}

export default LineChart
