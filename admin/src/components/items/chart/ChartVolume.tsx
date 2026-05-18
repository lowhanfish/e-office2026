'use client';

import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ChartOptions,
    ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MainColor } from '@/utilities/MainColor'

// Registrasi modul Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

interface datasetsItem {
    fill: boolean,
    label: string,
    data: number[],
    borderColor?: string,
    backgroundColor?: string,
    tension?: number,
    pointRadius?: number,
    pointHoverRadius?: number,
    borderWidth?: number
}

interface ChartVolumeProps {
    datasets: datasetsItem[],
    labels_volume: string[]
}

const ChartVolume = ({ datasets, labels_volume }: ChartVolumeProps) => {

    const labels = labels_volume;

    const ReplaceColor = (color: string, opacity: string) => {
        if (!color) return 'rgba(0,0,0,0.1)';
        const color1 = color.split(',')
        return color.replace(color1[3], `${opacity})`);
    }

    const DataSetFinal = datasets.map((item, index) => {
        // 1. Ambil warna dasar dengan aman menggunakan modulo
        const baseColor = MainColor.main[index % MainColor.main.length];

        return {
            ...item,
            tension: item.tension ?? 0.4,
            pointRadius: item.pointRadius ?? 3,
            pointHoverRadius: item.pointHoverRadius ?? 6,
            borderWidth: item.borderWidth ?? 1,
            borderColor: item.borderColor ?? ReplaceColor(baseColor, '1'),
            backgroundColor: item.backgroundColor ?? ReplaceColor(baseColor, '0.3'),
        };
    });

    const data: ChartData<'line'> = {
        labels,
        datasets: DataSetFinal,
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    color: '#BABABA',
                    font: {
                        size: 8,
                        family: 'Arial'
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#1f2937',
                padding: 12,
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 12,
                    color: '#BABABA',
                    font: {
                        size: 11,
                        family: 'Arial',
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(212, 212, 212, 0.2)',
                },
                ticks: {
                    stepSize: 20,
                    color: '#D4D4D4',
                    font: {
                        size: 12
                    }
                }
            },
        },
    };

    return (
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <Line options={options} data={data} />
        </div>
    );
};

export default ChartVolume;