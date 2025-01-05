import { HeaderFooter } from "@/components/header-footer"
import React from 'react'
import TVLChart from '@/components/TVLChart'
import StatsCard from '@/components/StatsCard'

export default function Dashboard() {
    return (
        <HeaderFooter>
            <main className="flex-1 overflow-hidden p-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatsCard title="Total Users" value="125,000" change="12%" isPositive={true}/>
                        <StatsCard title="24h Volume" value="$1.2B" change="5%" isPositive={true}/>
                        <StatsCard title="Market Cap" value="$45.6B" change="2%" isPositive={false}/>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md rounded-lg p-6">
                        <div className="h-[400px]">
                            <TVLChart/>
                        </div>
                    </div>
                    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 py-4">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <p className="text-center text-sm text-gray-400">© 2023 CryptoDash. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </main>
        </HeaderFooter>
    )
}

