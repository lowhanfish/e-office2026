'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartBarProps {
    labels: string[],
    list: number[],
    item: string

}

const ChartBar = ({ labels, list, item }: ChartBarProps) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: item,
                data: list,
                backgroundColor: 'rgba(151, 168, 215, 0.83)',
                borderRadius: 10,
                // borderSkipped: false,
            },
        ],
    };

    // Tambahkan 'return' dan pembungkus div
    return (
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>

            <Bar
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#BABABA', // Warna teks (contoh: Slate-500 Tailwind)
                                font: {
                                    size: 12,     // Ukuran font
                                    family: 'Arial', // Jenis font
                                    weight: 'normal',
                                }
                            }
                        },
                        y: {
                            ticks: {
                                color: '#D4D4D4',
                                font: {
                                    size: 12
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default ChartBar;