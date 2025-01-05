"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
    ChartOptions
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

interface APRChartModalProps {
    isOpen: boolean
    onClose: () => void
    poolName: string
}

export function APRChartModal({ isOpen, onClose, poolName }: APRChartModalProps) {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'APR %',
                data: [12, 15, 18, 14, 16, 19, 22],
                borderColor: 'rgb(255, 83, 201)',
                backgroundColor: 'rgba(255, 83, 201, 0.5)',
            },
        ],
    }

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${poolName} APR Change Over Time`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'APR %'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-[#1E1E1E] text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">{poolName} APR Chart</DialogTitle>
                </DialogHeader>
                <div className="mt-6">
                    <Line options={options} data={data} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

