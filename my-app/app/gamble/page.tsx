'use client'

import { useState } from "react"
import { ChevronDown, ArrowLeft, ArrowUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TokenSelectModal } from "@/components/token-select-modal"
import { TradingChart } from "@/components/trading-chart"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from 'next/dynamic'

const DynamicAttenuationChart = dynamic(() => import('@/components/attenuation-chart').then(mod => mod.AttenuationChart), { ssr: false })
const DynamicExponentialDecayChart = dynamic(() => import('@/components/attenuation-chart').then(mod => mod.ExponentialDecayChart), { ssr: false })

interface Token {
    symbol: string
    name: string
    logo: string
}

export default function Gamble() {
    const [isAdvancedMode, setIsAdvancedMode] = useState(false)
    const [sellAmount, setSellAmount] = useState("")
    const [buyAmount, setBuyAmount] = useState("")
    const [isTokenModalOpen, setIsTokenModalOpen] = useState(false)
    const [selectedSellToken, setSelectedSellToken] = useState<Token>({
        symbol: "ETH",
        name: "Ethereum",
        logo: "/placeholder.svg?height=40&width=40"
    })
    const [selectedBuyToken, setSelectedBuyToken] = useState<Token | null>(null)
    const [activeTokenSelect, setActiveTokenSelect] = useState<'sell' | 'buy'>('buy')
    const [isSwipedLeft, setIsSwipedLeft] = useState(false)

    const handleOpenTokenModal = (type: 'sell' | 'buy') => {
        setActiveTokenSelect(type)
        setIsTokenModalOpen(true)
    }

    const handleTokenSelect = (token: Token) => {
        if (activeTokenSelect === 'sell') {
            setSelectedSellToken(token)
        } else {
            setSelectedBuyToken(token)
        }
    }

    const handleSwapTokens = () => {
        const tempToken = selectedSellToken
        setSelectedSellToken(selectedBuyToken || tempToken)
        setSelectedBuyToken(tempToken)
        const tempAmount = sellAmount
        setSellAmount(buyAmount)
        setBuyAmount(tempAmount)
    }

    if (!isAdvancedMode) {
        return (
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 sm:p-4">
                <div
                    onClick={() => setIsAdvancedMode(true)}
                    className="bg-purple-700/20 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center hover:bg-purple-700/30 transition group cursor-pointer"
                >
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Advanced Trading</h2>
                    <p className="text-xs sm:text-sm text-gray-400 text-center group-hover:text-gray-300">
                        Access advanced TradingView features and tools
                    </p>
                </div>
                <div
                    onClick={() => setIsAdvancedMode(true)}
                    className="bg-purple-700/20 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center hover:bg-purple-700/30 transition group cursor-pointer"
                >
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Advanced Swap</h2>
                    <p className="text-xs sm:text-sm text-gray-400 text-center group-hover:text-gray-300">
                        Use advanced swap options and settings
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col lg:flex-row p-2 sm:p-4 gap-4">
            {/* TradingView Chart - 7 columns on large screens */}
            <div className="relative w-full lg:w-[70%] bg-[#1E2128] rounded-3xl p-2 sm:p-4 overflow-hidden">
                <AnimatePresence>
                    {isSwipedLeft && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="absolute inset-0 bg-[#1E2128] z-10 p-4"
                        >
                            <h2 className="text-white text-xl font-bold mb-4">Attenuation Coefficient</h2>
                            <div className="grid grid-cols-4 gap-4 h-[calc(100%-2rem)]">
                                <div className="col-span-3 bg-[#2C2F36] rounded-xl p-4">
                                    <div className="grid grid-rows-2 gap-2 h-full">
                                        <div>
                                            <h3 className="text-white font-medium mb-1">Time-based Attenuation</h3>
                                            <div className="h-[calc(100%-1.5rem)]">
                                                <DynamicAttenuationChart b={0.05} a={1} />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium mb-1">Price-based Attenuation</h3>
                                            <div className="h-[calc(100%-1.5rem)]">
                                                <DynamicExponentialDecayChart A={0.8} k={0.05} C={0.2} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 grid grid-rows-2 gap-4">
                                    <div className="bg-[#2C2F36] rounded-xl p-4 flex flex-col justify-center items-center">
                                        <h3 className="text-white font-medium mb-2 self-start">Attenuation Coefficient</h3>
                                        <div className="flex flex-col justify-center items-center flex-grow">
                                            <span className="text-4xl font-bold text-[#FF53C9]">0.95</span>
                                            <span className="text-sm text-gray-400 mt-2">Current Value</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#2C2F36] rounded-xl p-4">
                                        <h3 className="text-white font-medium mb-2">Additional Data</h3>
                                        <div className="flex flex-col justify-center h-full">
                                            <div className="mb-2">
                                                <span className="text-sm text-gray-400">Period:</span>
                                                <span className="text-lg font-semibold text-white ml-2">30 days</span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-400">Initial Price:</span>
                                                <span className="text-lg font-semibold text-white ml-2">$1000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <TradingChart />
            </div>

            {/* Swap Interface - 3 columns on large screens */}
            <div className="w-full lg:w-[30%] flex flex-col">
                <div className="relative bg-[#1E2128] rounded-[24px] p-3 sm:p-4 flex-grow">
                    {/* Left Arrow Oval */}
                    <div className="absolute -left-4 top-[27%] -translate-y-1/2 z-10">
                        <Button
                            className="rounded-full bg-[#FF53C9] hover:bg-[#FF53C9]/90 p-2"
                            onClick={() => setIsSwipedLeft(!isSwipedLeft)}
                        >
                            <ArrowLeft className="h-6 w-6 text-white" />
                        </Button>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {/* Sell Section */}
                        <div>
                            <label className="block text-[#9B9B9B] mb-1 sm:mb-2 text-sm sm:text-base">Sell</label>
                            <div className="relative bg-[#2C2F36] rounded-[20px] p-2 sm:p-4">
                                <input
                                    type="text"
                                    value={sellAmount}
                                    onChange={(e) => setSellAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white outline-none"
                                />
                                <button
                                    onClick={() => handleOpenTokenModal('sell')}
                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#363A45] hover:bg-[#40444F] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-[20px] flex items-center gap-1 sm:gap-2"
                                >
                                    <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#627EEA] flex items-center justify-center">
                                        <Image
                                            src={selectedSellToken.logo}
                                            alt={selectedSellToken.symbol}
                                            width={12}
                                            height={12}
                                            className="w-3 h-3 sm:w-4 sm:h-4"
                                        />
                                    </div>
                                    <span className="text-xs sm:text-base">{selectedSellToken.symbol}</span>
                                    <ChevronDown className="h-3 w-3 sm:h-5 sm:w-5" />
                                </button>
                                <div className="text-[#9B9B9B] text-xs sm:text-sm mt-1">$0</div>
                            </div>
                        </div>

                        {/* Arrow Separator */}
                        <div className="flex justify-center -my-2">
                            <button
                                onClick={handleSwapTokens}
                                className="bg-[#2C2F36] p-2 sm:p-3 rounded-full hover:bg-[#363A45] transition-colors"
                            >
                                <ArrowUpDown className="h-4 w-4 sm:h-6 sm:w-6 text-[#9B9B9B]" />
                            </button>
                        </div>

                        {/* Buy Section */}
                        <div>
                            <label className="block text-[#9B9B9B] mb-1 sm:mb-2 text-sm sm:text-base">Buy</label>
                            <div className="relative bg-[#2C2F36] rounded-[20px] p-2 sm:p-4">
                                <input
                                    type="text"
                                    value={buyAmount}
                                    readOnly
                                    placeholder="0"
                                    className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white outline-none cursor-not-allowed"
                                />
                                <button
                                    onClick={() => handleOpenTokenModal('buy')}
                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white
                    px-2 sm:px-4 py-1 sm:py-2 rounded-[20px] flex items-center gap-1 sm:gap-2
                    text-xs sm:text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[160px]"
                                >
                                    {selectedBuyToken ? (
                                        <>
                                            <Image
                                                src={selectedBuyToken.logo}
                                                alt={selectedBuyToken.symbol}
                                                width={24}
                                                height={24}
                                                className="w-4 h-4 sm:w-6 sm:h-6 rounded-full"
                                            />
                                            <span>{selectedBuyToken.symbol}</span>
                                        </>
                                    ) : (
                                        <span>Select token</span>
                                    )}
                                    <ChevronDown className="h-3 w-3 sm:h-5 sm:w-5 flex-shrink-0" />
                                </button>
                                <div className="text-[#9B9B9B] text-xs sm:text-sm mt-1">$0</div>
                            </div>
                        </div>

                        {/* Get Started Button */}
                        <Button
                            className="w-full bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white py-3 sm:py-6 rounded-[20px]
                text-sm sm:text-lg font-semibold min-h-[40px] sm:min-h-[56px]"
                            onClick={() => {}}
                        >
                            Get started
                        </Button>
                    </div>
                </div>

                {/* Back Button */}
                <Button
                    variant="outline"
                    onClick={() => setIsAdvancedMode(false)}
                    className="w-full py-2 sm:py-3 text-sm sm:text-base mt-4"
                >
                    Back to Overview
                </Button>
            </div>

            {/* Token Selection Modal */}
            <TokenSelectModal
                isOpen={isTokenModalOpen}
                onClose={() => setIsTokenModalOpen(false)}
                onSelect={handleTokenSelect}
            />
        </div>
    )
}

