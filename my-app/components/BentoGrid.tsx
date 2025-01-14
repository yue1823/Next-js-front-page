import React from 'react'
import { motion } from 'framer-motion'
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

interface BentoGridProps {
    token1: string
    token2: string
    token1Logo: string
    token2Logo: string
    liquidityData: { time: number; value: number }[]
    totalLiquidity: string
    onClick: () => void
}
const ConcaveShape: React.FC = () => {
    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gray-800 rounded-full transform scale-x-[2] scale-y-[0.5]"></div>
            <div className="absolute inset-0 bg-gray-900 rounded-full transform scale-x-[1.9] scale-y-[0.45]"></div>
        </div>
    )
}

const BentoGrid: React.FC<BentoGridProps> = ({
                                                 token1,
                                                 token2,
                                                 token1Logo,
                                                 token2Logo,
                                                 liquidityData,
                                                 totalLiquidity,
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
        <motion.div
            className="relative w-full h-96 cursor-pointer"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <ConcaveShape />
            </div>
            <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full relative overflow-hidden">
                    <Image
                        src={token1Logo}
                        alt={token1}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-l-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white">{token1}</h3>
                    </div>
                </div>
                <div className="w-1/2 h-full relative overflow-hidden">
                    <Image
                        src={token2Logo}
                        alt={token2}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-r-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white">{token2}</h3>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-4/5 h-4/5 flex">
                    <Card className="w-1/2 bg-gray-800 p-4 mr-2 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Total Liquidity</h4>
                        <p className="text-xl font-bold">{totalLiquidity}</p>
                    </Card>
                    <Card className="w-1/2 bg-gray-800 p-4 ml-2 rounded-xl">
                        <div className="h-full">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </Card>
                </div>
            </div>
        </motion.div>
    )
}

export default BentoGrid
