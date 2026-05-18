'use client';

import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { MainColor } from '@/utilities/MainColor'

// Registrasi modul yang diperlukan
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface ChartRadarData {
    fill?: boolean,
    label: string,
    data: number[],
    // Menggunakan palet biru senada dengan ChartVolume Anda
    backgroundColor?: string,
    borderColor?: string,
    borderWidth?: number,
    pointBackgroundColor?: string,
    pointBorderColor?: string,
    pointHoverBackgroundColor?: string,
    pointHoverBorderColor?: string,
    pointRadius?: number,
}

interface ChartRadarProps {
    labels: string[];
    datasets: ChartRadarData[];
}

export function ChartRadar({ labels, datasets }: ChartRadarProps) {


    const ReplaceColor = (color: string, opacity: string) => {
        if (!color) return 'rgba(0,0,0,0.1)';
        const color1 = color.split(',')
        return color.replace(color1[3], `${opacity})`);
    }

    const DataSetFinal = datasets.map((item, index) => {
        const baseColor = MainColor.main[index % MainColor.main.length];

        return {
            ...item,
            backgroundColor: item.backgroundColor ?? ReplaceColor(baseColor, '0.3'),
            borderColor: item.borderColor ?? ReplaceColor(baseColor, '1'),
            borderWidth: item.borderWidth ?? 2,
            pointBackgroundColor: item.pointBackgroundColor ?? ReplaceColor(baseColor, '1'),
            pointBorderColor: item.pointBorderColor ?? '#fff',
            pointHoverBackgroundColor: item.pointHoverBackgroundColor ?? '#fff',
            pointHoverBorderColor: item.pointHoverBorderColor ?? ReplaceColor(baseColor, '1'),
            pointRadius: item.pointRadius ?? 3,
        }
    })

    const data: ChartData<'radar'> = {
        labels: labels,
        datasets: DataSetFinal,
    };

    const options: ChartOptions<'radar'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(212, 212, 212, 0.3)', // Garis jari-jari dari pusat ke luar
                },
                grid: {
                    display: true,
                    color: 'rgba(180, 185, 197, 0.35)', // Garis lingkaran/tingkatan
                    circular: false, // Ubah ke true jika ingin garis bulat sempurna
                },
                beginAtZero: true,
                min: 0,
                ticks: {
                    display: true,
                    // Hapus stepSize: 1 agar Chart.js menghitung otomatis 
                    // atau gunakan angka besar jika datanya mencapai puluhan/ratusan
                    maxTicksLimit: 7, // Membatasi maksimal hanya ada 7 garis lingkaran agar tetap bersih
                    backdropColor: 'transparent',
                    color: '#BABABA',
                    font: {
                        size: 10,
                    },
                },
                pointLabels: {
                    display: true,
                    color: '#A8A8A8', // Warna teks label (WhatsApp, FB, dll)
                    font: {
                        size: 11,
                        family: 'Arial',
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    color: '#A8A8A8',
                    font: {
                        size: 11,
                    },
                },
            },
            tooltip: {
                backgroundColor: '#1f2937',
                padding: 12,
                cornerRadius: 8,
            },
        },
    };

    return (
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <Radar data={data} options={options} />
        </div>
    );
}

export default ChartRadar;