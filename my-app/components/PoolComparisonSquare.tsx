import React from 'react'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface PoolComparisonSquareProps {
    token1: string
    token2: string
    token1Logo: string
    token2Logo: string
    liquidityData: { time: number; value: number }[]
    onClick: () => void
}

const PoolComparisonSquare: React.FC<PoolComparisonSquareProps> = ({
                                                                       token1,
                                                                       token2,
                                                                       token1Logo,
                                                                       token2Logo,
                                                                       liquidityData,
                                                                       onClick,
                                                                   }) => {
    const chartData = {
        labels: liquidityData.map(d => d.time.toString()),
        datasets: [
            {
                label: 'Liquidity',
                data: liquidityData.map(d => d.value),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    return (
        <Card
            className="w-full bg-gray-800 p-4 hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center mb-2">
                <div className="relative w-12 h-6">
                    <Image
                        src={token1Logo}
                        alt={token1}
                        width={24}
                        height={24}
                        className="absolute left-0 top-0 rounded-full"
                    />
                    <Image
                        src={token2Logo}
                        alt={token2}
                        width={24}
                        height={24}
                        className="absolute right-0 top-0 rounded-full"
                    />
                </div>
                <h3 className="ml-2 text-lg font-semibold">{token1}/{token2}</h3>
            </div>
            <div className="h-24">
                <Line data={chartData} options={chartOptions} />
            </div>
        </Card>
    )
}

export default PoolComparisonSquare

