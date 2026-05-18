import { useState } from 'react'
import { ChartRadar } from '@/components/items/chart/ChartRadar'

const RadarChart = () => {

    const [list, setList] = useState([31, 21, 13, 15, 24]);
    const [labels, setLabels] = useState(['WhatsAppz', 'FaceBook', 'Instagram', 'TikTok', 'Telegram']);

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
                <p className='text-b-gray-4'>Radar Chart</p>
            </div>

            <ChartRadar
                labels={labels}
                datasets={datasets}
            />

        </>
    )
}

export default RadarChart
