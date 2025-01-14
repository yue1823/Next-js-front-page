'use client'

import { useState, useEffect } from "react"
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TradingChart } from "@/components/trading-chart"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from 'next/dynamic'
import { HeaderFooter } from "@/components/header-footer"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {popularTokens} from "@/components/token-select-modal";


const DynamicAttenuationChart = dynamic(() => import('@/components/attenuation-chart').then(mod => mod.AttenuationChart), { ssr: false })
const DynamicExponentialDecayChart = dynamic(() => import('@/components/attenuation-chart').then(mod => mod.ExponentialDecayChart), { ssr: false })

// New chart component for pool rewards
const PoolRewardChart = dynamic(() => import('@/components/pool-reward-chart'), { ssr: false })

export default function Gamble() {
    const [isAdvancedMode, setIsAdvancedMode] = useState(false)
    const [sellAmount, setSellAmount] = useState("")
    const [buyAmount, setBuyAmount] = useState("")
    const [isSwipedLeft, setIsSwipedLeft] = useState(false)
    const [tradeMode, setTradeMode] = useState<'sell' | 'buy'>('buy')


    // Pool data
    const [aptBalance, setAptBalance] = useState(1000000)
    const [tokenBalance, setTokenBalance] = useState(1000000)
    const [userAptBalance, setUserAptBalance] = useState(1000)
    const [userTokenBalance, setUserTokenBalance] = useState(1000)
    const [aprPercentage, setAprPercentage] = useState(24.5)
    const [daysRemaining, setDaysRemaining] = useState(30)

    // New state for user input and calculated output
    const [userInput, setUserInput] = useState<number | null>(null)
    const [calculatedOutput, setCalculatedOutput] = useState<number | null>(null)

    // New state for updated pool balances
    const [newAptBalance, setNewAptBalance] = useState<number | null>(null)
    const [newTokenBalance, setNewTokenBalance] = useState<number | null>(null)

    // Fixed token data
    const TRUMP = {
        symbol: "TRUMP",
        logo: "data:image/jpeg;base64,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"
    }
    const aptToken = {
        symbol: "USDT",
        logo: popularTokens[1].logo
    }

    const a= ()=>{
        setAptBalance(1000000)
        setTokenBalance(1000000)
        setUserAptBalance(1000)
        setUserTokenBalance(1000)
        setAprPercentage(24.5)
        setDaysRemaining(30)
    }
    useEffect(() => {
        a()
    }, []);

    // Function to calculate token output based on USDT input
    const calculateTokenOutput = (aptInput: number) => {
        const k = aptBalance * tokenBalance // Constant product k
        const newAptBalance = aptBalance + aptInput
        const newTokenBalance = k / newAptBalance
        const tokensReceived = tokenBalance - newTokenBalance
        return { tokensReceived, newAptBalance, newTokenBalance }
    }

    // Effect to update calculated output when user input changes
    useEffect(() => {
        if (userInput !== null) {
            const { tokensReceived, newAptBalance: updatedAptBalance, newTokenBalance: updatedTokenBalance } = calculateTokenOutput(userInput)
            setCalculatedOutput(tokensReceived)
            setNewAptBalance(updatedAptBalance)
            setNewTokenBalance(updatedTokenBalance)
        } else {
            setCalculatedOutput(null)
            setNewAptBalance(null)
            setNewTokenBalance(null)
        }
    }, [userInput])

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
        <HeaderFooter>
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
                                {tradeMode === 'sell' ? (
                                    // Sell Mode - Attenuation Charts
                                    <>
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
                                    </>
                                ) : (
                                    // Buy Mode - Pool Rewards and Profit Charts
                                    <>
                                        <h2 className="text-white text-xl font-bold mb-4">Pool Statistics</h2>
                                        <div className="grid grid-cols-4 gap-4 h-[calc(100%-2rem)]">
                                            <div className="col-span-3 bg-[#2C2F36] rounded-xl p-4">
                                                <h3 className="text-white font-medium mb-4">Pool Composition and Rewards</h3>
                                                <div className="h-[calc(100%-2rem)]">
                                                    <PoolRewardChart
                                                        aptBalance={aptBalance}
                                                        tokenBalance={tokenBalance}
                                                        userAptBalance={userAptBalance}
                                                        userTokenBalance={userTokenBalance}
                                                        aprPercentage={aprPercentage}
                                                        daysRemaining={daysRemaining}
                                                        newAptBalance={newAptBalance || undefined}
                                                        newTokenBalance={newTokenBalance || undefined}
                                                        userInput={userInput || undefined}
                                                        calculatedOutput={calculatedOutput || undefined}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-1 grid grid-rows-2 gap-4">
                                                <div className="bg-[#2C2F36] rounded-xl p-4">
                                                    <h3 className="text-white font-medium mb-2">Period</h3>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <span className="text-sm text-gray-400">end of the DATE </span>
                                                            <span className="block text-2xl font-bold text-[#FF53C9]">04-11-2024</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-sm text-gray-400">Days Remaining</span>
                                                            <span className="block text-xl font-semibold text-white">{daysRemaining}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-[#2C2F36] rounded-xl p-4">
                                                    <h3 className="text-white font-medium mb-2">Pool Statistics</h3>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <span className="text-sm text-gray-400">Total USDT</span>
                                                            <span className="block text-xl font-semibold text-white">{aptBalance.toLocaleString()}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-sm text-gray-400">Total Tokens</span>
                                                            <span className="block text-xl font-semibold text-white">{tokenBalance.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}
                        <TradingChart />
                    </AnimatePresence>
                </div>

                {/* Swap Interface - 3 columns on large screens */}
                <div className="w-full lg:w-[30%] flex flex-col">
                    <div className="relative bg-[#1E2128] rounded-[24px] p-6 sm:p-8 flex-grow">
                        {/* Left Arrow Oval */}
                        <div className="absolute -left-4 top-1/3 -translate-y-1/2 z-10">
                            <Button
                                className="rounded-full bg-[#FF53C9] hover:bg-[#FF53C9]/90 p-2"
                                onClick={() => setIsSwipedLeft(!isSwipedLeft)}
                            >
                                <ArrowRight className="h-6 w-6 text-white" />
                            </Button>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                            {/* Trade Mode Selector */}
                            <Tabs defaultValue="buy" className="w-full" onValueChange={(value) => setTradeMode(value as 'sell' | 'buy')}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="sell">Sell {TRUMP.symbol}</TabsTrigger>
                                    <TabsTrigger value="buy">Buy {TRUMP.symbol}</TabsTrigger>
                                </TabsList>
                            </Tabs>

                            {/* Input Section */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={tradeMode}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-[#9B9B9B] mb-1 sm:mb-2 text-sm sm:text-base">
                                            {tradeMode === 'sell' ? `Sell ${TRUMP.symbol}` : `Buy ${TRUMP.symbol} with USDT`}
                                        </label>
                                        <div className="relative bg-[#2C2F36] rounded-[20px] p-2 sm:p-4">
                                            <input
                                                type="number"
                                                value={tradeMode === 'sell' ? sellAmount : buyAmount}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value)
                                                    if (tradeMode === 'sell') {
                                                        setSellAmount(e.target.value)
                                                    } else {
                                                        setBuyAmount(e.target.value)
                                                        setUserInput(isNaN(value) ? null : value)
                                                    }
                                                }}
                                                placeholder="0"
                                                className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white outline-none"
                                            />
                                            <div className='ll continue the text stream from the cut-off point:outline-none'/>
                      <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#363A45] px-2 sm:px-4 py-1 sm:py-2 rounded-[20px] flex items-center gap-1 sm:gap-2">
                        <Image
                          src={tradeMode === 'sell' ? TRUMP.logo : aptToken.logo}
                          alt={tradeMode === 'sell' ? TRUMP.symbol : aptToken.symbol}
                          width={24}
                          height={24}
                          className="w-4 h-4 sm:w-6 sm:h-6 rounded-full"
                        />
                        <span className="text-xs sm:text-base text-white">
                          {tradeMode === 'sell' ? TRUMP.symbol : aptToken.symbol}
                        </span>
                      </div>
                      <div className="text-[#9B9B9B] text-xs sm:text-sm mt-1">$0</div>
                    </div>
                  </div>

                  {/* Output Section */}
                  <div>
                    <label className="block text-[#9B9B9B] mb-1 sm:mb-2 text-sm sm:text-base">
                      {tradeMode === 'sell' ? 'Receive USDT' : `Receive ${TRUMP.symbol}`}
                    </label>
                    <div className="relative bg-[#2C2F36] rounded-[20px] p-2 sm:p-4">
                      <input
                        type="text"
                        value={tradeMode === 'sell' ? calculatedOutput?.toFixed(6) || '' : calculatedOutput?.toFixed(6) || ''}
                        readOnly
                        placeholder="0"
                        className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white outline-none cursor-not-allowed"
                      />
                      <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#FF53C9] px-2 sm:px-4 py-1 sm:py-2 rounded-[20px] flex items-center gap-1 sm:gap-2">
                        <Image
                          src={tradeMode === 'sell' ? aptToken.logo : TRUMP.logo}
                          alt={tradeMode === 'sell' ? aptToken.symbol : TRUMP.symbol}
                          width={24}
                          height={24}
                          className="w-4 h-4 sm:w-6 sm:h-6 rounded-full"
                        />
                        <span className="text-xs sm:text-base text-white">
                          {tradeMode === 'sell' ? aptToken.symbol : TRUMP.symbol}
                        </span>
                      </div>
                      <div className="text-[#9B9B9B] text-xs sm:text-sm mt-1">$0</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white py-4 sm:py-6 rounded-[20px]
                        text-sm sm:text-lg font-semibold min-h-[48px] sm:min-h-[64px] mt-6"
                    onClick={() => {}}
                  >
                    {tradeMode === 'sell' ? 'Sell Now' : 'Buy Now'}
                  </Button>
                </motion.div>
              </AnimatePresence>

              {/* New Section: American President Prediction */}
              <div className="bg-[#2C2F36] rounded-[20px] p-4 sm:p-6 mt-6">
                <h3 className="text-white font-medium mb-4">Who will be the American president?</h3>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => setIsAdvancedMode(false)}
            className="w-full py-2 sm:py-3 text-sm sm:text-base mt-6"
          >
            Back to Overview
          </Button>
        </div>
      </div>
    </HeaderFooter>
  )
}

