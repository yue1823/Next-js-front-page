'use client'

import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import {  ArrowRight } from 'lucide-react'


ChartJS.register(ArcElement, Tooltip, Legend)

interface PoolRewardChartProps {
    aptBalance: number
    tokenBalance: number
    userAptBalance: number
    userTokenBalance: number
    aprPercentage: number
    daysRemaining: number
    newAptBalance?: number
    newTokenBalance?: number
    userInput?: number
    calculatedOutput?: number
}

const PoolRewardChart: React.FC<PoolRewardChartProps> = ({
                                                             aptBalance,
                                                             tokenBalance,
                                                             userAptBalance,
                                                             userTokenBalance,
                                                             aprPercentage,
                                                             daysRemaining,
                                                             newAptBalance,
                                                             newTokenBalance,
                                                         }) => {
    // const [showUpdatedPool, setShowUpdatedPool] = React.useState(false)

    const createChartData = (USDT: number, TRUMP: number) => ({
        labels: ['USDT', 'TRUMP'],
        datasets: [
            {
                data: [USDT, TRUMP],
                backgroundColor: ['#FF53C9', '#3F3F46'],
                borderColor: ['#FF53C9', '#3F3F46'],
                borderWidth: 1,
            },
        ],
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: 'white',
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.label || ''
                        const value = context.raw || 0
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                        const percentage = ((value / total) * 100).toFixed(2)
                        return `${label}: ${value.toFixed(2)} (${percentage}%)`
                    },
                },
            },
        },
    }

    const originalData = createChartData(aptBalance, tokenBalance)
    const updatedData = createChartData(newAptBalance || aptBalance, newTokenBalance || tokenBalance)

    const totalPoolValue = aptBalance + tokenBalance
    const userPoolShare = (userAptBalance + userTokenBalance) / totalPoolValue
    const estimatedEarnings = (userPoolShare * totalPoolValue * (aprPercentage / 100) * (daysRemaining / 365)).toFixed(2)

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">Pool Composition</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-64">
                    <Pie data={originalData} options={options} />
                    {/*<p className="text-center text-white mt-2">Original Pool</p>*/}
                </div>
                <ArrowRight className=" left-80 absolute " />
                {newAptBalance && newTokenBalance && (
                    <div className="h-64">
                        <Pie data={updatedData} options={options} />
                        {/*<p className="text-center text-white mt-2">Updated Pool</p>*/}
                    </div>
                )}
            </div>
            <div className="space-y-2 text-white">
                <p>Your USDT Balance: {userAptBalance.toFixed(2)} USDT</p>
                <p>Your TRUMP Balance: {userTokenBalance.toFixed(2)} TRUMP</p>
                <p>Your Pool Share: {(userPoolShare * 100).toFixed(2)}%</p>
                <p>Estimated Earnings: {estimatedEarnings} USDT</p>
            </div>
            <div className="text-sm text-gray-400">
                <p>Earnings Equation:</p>
                <p>Earnings = Your Pool Share * (Total Pool Value * 0.9)</p>
                <p>= {userPoolShare.toFixed(4)} * ( {totalPoolValue.toFixed(2)} * 0.9) </p>
            </div>
        </div>
    )
}

export default PoolRewardChart

