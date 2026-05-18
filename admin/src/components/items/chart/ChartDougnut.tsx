import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartDougnutProps {
    labels: string[],
    list: number[],
    item: string
}



export function ChartDougnut({ labels, list, item }: ChartDougnutProps) {

    const data = {
        labels: labels,
        datasets: [
            {
                label: item,
                data: list,
                backgroundColor: [
                    'rgba(180, 185, 197, 0.8)',
                    'rgba(151, 168, 215, 0.8)',
                    'rgba(108, 136, 214, 0.8)',
                    'rgba(69, 102, 193, 0.8)',
                    'rgba(37, 72, 168, 0.8)',
                    'rgba(16, 49, 140, 0.8)',
                    'rgba(5, 36, 120, 0.8)',
                ],
                borderColor: [
                    'rgba(180, 185, 197, 1)',
                    'rgba(151, 168, 215, 1)',
                    'rgba(108, 136, 214, 1)',
                    'rgba(69, 102, 193, 1)',
                    'rgba(37, 72, 168, 1)',
                    'rgba(16, 49, 140, 1)',
                    'rgba(5, 36, 120, 0.8)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>

            <Doughnut
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
}
