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

// Ubah interface agar bisa menerima beberapa list data
interface ChartBarProps {
    labels: string[];
}

// 'rgba(180, 185, 197, 0.8)',
// 'rgba(151, 168, 215, 0.8)',
// 'rgba(108, 136, 214, 0.8)',
// 'rgba(69, 102, 193, 0.8)',
// 'rgba(37, 72, 168, 0.8)',
// 'rgba(16, 49, 140, 0.8)',
// 'rgba(5, 36, 120, 0.8)',


var data_sets = [
    {
        label: "Zero",
        data: [15, 25, 35, 12, 2],
        backgroundColor: 'rgba(180, 185, 197, 0.8)',
        borderRadius: 10,
    },
    {
        label: "First",
        data: [10, 20, 30, 12, 5],
        backgroundColor: 'rgba(151, 168, 215, 0.8)',
        borderRadius: 10,
    },
    {
        label: "Seccond",
        data: [15, 25, 35, 14, 3],
        backgroundColor: 'rgba(108, 136, 214, 0.8)',
        borderRadius: 10,
    },
    {
        label: "Third",
        data: [15, 25, 35, 12, 2],
        backgroundColor: 'rgba(69, 102, 193, 0.8)',
        borderRadius: 10,
    },
    {
        label: "Fourth",
        data: [15, 25, 35, 12, 2],
        backgroundColor: 'rgba(37, 72, 168, 0.8)',
        borderRadius: 10,
    },
    {
        label: "Fifth",
        data: [15, 25, 35, 12, 2],
        backgroundColor: 'rgba(16, 49, 140, 0.8)',
        borderRadius: 10,
    },
    {
        label: "Sixth",
        data: [15, 25, 35, 12, 2],
        backgroundColor: 'rgba(5, 36, 120, 0.8)',
        borderRadius: 10,
    },

]




const ChartBarGroup = ({ labels }: ChartBarProps) => {
    const data = {
        labels: labels,
        datasets: data_sets,
    };

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
                            // Secara default stacked adalah false, 
                            // jadi bar akan otomatis berkelompok (grouped)
                            ticks: {
                                color: '#BABABA',
                                font: { size: 12, family: 'Arial' }
                            }
                        },
                        y: {
                            ticks: {
                                color: '#D4D4D4',
                                font: { size: 12 }
                            },
                            beginAtZero: true
                        }
                    }
                }}
            />
        </div>
    );
};

export default ChartBarGroup;