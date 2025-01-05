'use client'

import { useState } from "react"
import { HeaderFooter } from "@/components/header-footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ArrowUpRight, Plus, Minus, Droplet } from 'lucide-react'
import Image from "next/image"
import { AddLiquidityModal } from "@/components/add-liquidity-modal"
import { RemoveLiquidityModal } from "@/components/remove-liquidity-modal"
import { FaucetModal } from "@/components/faucet-modal"
import { APRChartModal } from "@/components/apr-chart-modal"

interface PoolData {
    id: string
    token1: string
    token2: string
    apr: number
    tvl: string
    volume24h: string
    token1Logo: string
    token2Logo: string
    userLPTokens?: string
}

const pools: PoolData[] = [
    {
        id: "1",
        token1: "APT",
        token2: "USDT",
        apr: 12.5,
        tvl: "$1.2M",
        volume24h: "$450K",
        token1Logo: "/placeholder.svg?height=32&width=32",
        token2Logo: "/placeholder.svg?height=32&width=32"
    },
    {
        id: "2",
        token1: "USDC",
        token2: "USDT",
        apr: 8.2,
        tvl: "$2.5M",
        volume24h: "$890K",
        token1Logo: "/placeholder.svg?height=32&width=32",
        token2Logo: "/placeholder.svg?height=32&width=32"
    },
    {
        id: "3",
        token1: "APT",
        token2: "USDC",
        apr: 15.8,
        tvl: "$800K",
        volume24h: "$320K",
        token1Logo: "/placeholder.svg?height=32&width=32",
        token2Logo: "/placeholder.svg?height=32&width=32"
    }
]

const userPools: PoolData[] = [
    {
        id: "1",
        token1: "ETH",
        token2: "USDT",
        apr: 12.5,
        tvl: "$50K",
        volume24h: "$10K",
        token1Logo: "/placeholder.svg?height=32&width=32",
        token2Logo: "/placeholder.svg?height=32&width=32",
        userLPTokens: "100.00"
    }
]

export default function Pool() {
    const [activeTab, setActiveTab] = useState("all")
    const [isAddLiquidityModalOpen, setIsAddLiquidityModalOpen] = useState(false)
    const [isRemoveLiquidityModalOpen, setIsRemoveLiquidityModalOpen] = useState(false)
    const [isFaucetModalOpen, setIsFaucetModalOpen] = useState(false)
    const [isAPRChartModalOpen, setIsAPRChartModalOpen] = useState(false)
    const [selectedPool, setSelectedPool] = useState<PoolData | null>(null)

    const handleRemoveLiquidity = (pool: PoolData) => {
        setSelectedPool(pool)
        setIsRemoveLiquidityModalOpen(true)
    }

    const handleOpenAPRChart = (pool: PoolData) => {
        setSelectedPool(pool)
        setIsAPRChartModalOpen(true)
    }

    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Pools</h1>
                            <p className="text-gray-400">Provide liquidity to earn fees and rewards</p>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                className="bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white"
                                size="lg"
                                onClick={() => setIsAddLiquidityModalOpen(true)}
                            >
                                <Plus className="mr-2 h-5 w-5" /> Create Pool
                            </Button>
                            <Button
                                className="bg-[#3C3F46] hover:bg-[#4C4F56] text-white"
                                size="lg"
                                onClick={() => setIsFaucetModalOpen(true)}
                            >
                                <Droplet className="mr-2 h-5 w-5" /> Faucet
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="bg-gray-800">
                            <TabsTrigger value="all">All Pools</TabsTrigger>
                            <TabsTrigger value="my">My Positions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {pools.map((pool) => (
                                    <PoolCard
                                        key={pool.id}
                                        pool={pool}
                                        onOpenAPRChart={() => handleOpenAPRChart(pool)}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="my" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {userPools.length > 0 ? (
                                    userPools.map((pool) => (
                                        <PoolCard
                                            key={pool.id}
                                            pool={pool}
                                            isUserPool
                                            onRemoveLiquidity={() => handleRemoveLiquidity(pool)}
                                            onOpenAPRChart={() => handleOpenAPRChart(pool)}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-12">
                                        <p className="text-gray-400">You haven't provided liquidity to any pools yet.</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <AddLiquidityModal
                isOpen={isAddLiquidityModalOpen}
                onClose={() => setIsAddLiquidityModalOpen(false)}
                poolTokens={selectedPool ? {
                    token1: { symbol: selectedPool.token1, name: selectedPool.token1, logo: selectedPool.token1Logo },
                    token2: { symbol: selectedPool.token2, name: selectedPool.token2, logo: selectedPool.token2Logo }
                } : undefined}
            />
            {selectedPool && (
                <RemoveLiquidityModal
                    isOpen={isRemoveLiquidityModalOpen}
                    onClose={() => setIsRemoveLiquidityModalOpen(false)}
                    poolTokens={{
                        token1: { symbol: selectedPool.token1, name: selectedPool.token1, logo: selectedPool.token1Logo },
                        token2: { symbol: selectedPool.token2, name: selectedPool.token2, logo: selectedPool.token2Logo }
                    }}
                    userLPTokens={selectedPool.userLPTokens || "0"}
                />
            )}
            <FaucetModal
                isOpen={isFaucetModalOpen}
                onClose={() => setIsFaucetModalOpen(false)}
            />
            {selectedPool && (
                <APRChartModal
                    isOpen={isAPRChartModalOpen}
                    onClose={() => setIsAPRChartModalOpen(false)}
                    poolName={`${selectedPool.token1}/${selectedPool.token2}`}
                />
            )}
        </HeaderFooter>
    )
}

interface PoolCardProps {
    pool: PoolData
    isUserPool?: boolean
    onRemoveLiquidity?: () => void
    onOpenAPRChart: () => void
}

function PoolCard({ pool, isUserPool = false, onRemoveLiquidity, onOpenAPRChart }: PoolCardProps) {
    return (
        <Card className="bg-gray-800 hover:bg-gray-700/50 transition-colors p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="relative">
                        <Image
                            src={pool.token1Logo}
                            alt={pool.token1}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <Image
                            src={pool.token2Logo}
                            alt={pool.token2}
                            width={32}
                            height={32}
                            className="rounded-full absolute -right-3 -bottom-1"
                        />
                    </div>
                    <span className="ml-6 text-lg font-medium">
            {pool.token1}/{pool.token2}
          </span>
                </div>
                <Button variant="ghost" size="icon" onClick={onOpenAPRChart}>
                    <ArrowUpRight className="h-5 w-5" />
                </Button>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">APR</span>
                    <span className="text-[#FF53C9] font-medium">{pool.apr}%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">TVL</span>
                    <span className="text-white">{pool.tvl}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">24h Volume</span>
                    <span className="text-white">{pool.volume24h}</span>
                </div>
            </div>

            {isUserPool && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400">Your Position</span>
                        <span className="text-white">{pool.tvl}</span>
                    </div>
                    <Button
                        className="w-full bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white"
                        onClick={onRemoveLiquidity}
                    >
                        <Minus className="mr-2 h-4 w-4" /> Remove Liquidity
                    </Button>
                </div>
            )}
        </Card>
    )
}

