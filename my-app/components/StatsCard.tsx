import React from 'react'

interface StatsCardProps {
    title: string
    value: string
    change: string
    isPositive: boolean
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, isPositive }) => {
    return (
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-semibold">{value}</span>
                <span className={`ml-2 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '↑' : '↓'} {change}
        </span>
            </div>
        </div>
    )
}

export default StatsCard

