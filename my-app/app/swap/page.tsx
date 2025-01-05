'use client'

import { useState } from "react"
import { ChevronDown,  ArrowUpDown, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TokenSelectModal } from "@/components/token-select-modal"

import { HeaderFooter } from "@/components/header-footer"

interface Token {
  symbol: string
  name: string
  logo: string
}

const swapMethods = ["Standard", "Flash Swap", "Cross-Chain"]

export default function Swap() {
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
  const [activeSwapMethod, setActiveSwapMethod] = useState(swapMethods[0])
  const [currentStep, setCurrentStep] = useState(1)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

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

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  return (
      <HeaderFooter>
        <div className="w-full h-full flex justify-center items-center p-4">
          <div className="w-full max-w-md relative">
            <div className="bg-[#1E2128] rounded-3xl p-6 flex">
              {/* Swap Method Selector */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-4 flex flex-col space-y-4">
                {swapMethods.map((method, index) => (
                    <button
                        key={method}
                        onClick={() => setActiveSwapMethod(method)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            method === activeSwapMethod ? 'bg-[#FF53C9]' : 'bg-[#2C2F36]'
                        }`}
                    >
                      <Image
                          src={`/swap-method-${index + 1}.svg`}
                          alt={method}
                          width={24}
                          height={24}
                      />
                    </button>
                ))}
              </div>

              {/* Swap Interface */}
              <div className="flex-grow space-y-4">
                {/* Sell Section */}
                <div>
                  <label className="block text-[#9B9B9B] mb-2 text-sm">Sell</label>
                  <div className="relative bg-[#2C2F36] rounded-[20px] p-4">
                    <input
                        type="text"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        placeholder="0"
                        className="w-full bg-transparent text-2xl text-white outline-none"
                    />
                    <button
                        onClick={() => handleOpenTokenModal('sell')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#363A45] hover:bg-[#40444F] text-white px-4 py-2 rounded-[20px] flex items-center gap-2"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center">
                        <Image
                            src={selectedSellToken.logo}
                            alt={selectedSellToken.symbol}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                      </div>
                      <span>{selectedSellToken.symbol}</span>
                      <ChevronDown className="h-5 w-5" />
                    </button>
                    <div className="text-[#9B9B9B] text-sm mt-1">$0</div>
                  </div>
                </div>

                {/* Steps Indicator */}
                <div className="flex justify-between items-center my-4">
                  {[1, 2, 3].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step <= currentStep ? 'bg-[#FF53C9] text-white' : 'bg-gray-600 text-gray-400'
                        }`}>
                          {step}
                        </div>
                        <span className="text-xs mt-1 text-gray-400">
                      {step === 1 ? 'Select' : step === 2 ? 'Review' : 'Confirm'}
                    </span>
                      </div>
                  ))}
                </div>

                {/* Arrow Separator */}
                <div className="flex justify-center -my-2">
                  <button
                      onClick={handleSwapTokens}
                      className="bg-[#2C2F36] p-3 rounded-full hover:bg-[#363A45] transition-colors"
                  >
                    <ArrowUpDown className="h-6 w-6 text-[#9B9B9B]" />
                  </button>
                </div>

                {/* Buy Section */}
                <div>
                  <label className="block text-[#9B9B9B] mb-2 text-sm">Buy</label>
                  <div className="relative bg-[#2C2F36] rounded-[20px] p-4">
                    <input
                        type="text"
                        value={buyAmount}
                        readOnly
                        placeholder="0"
                        className="w-full bg-transparent text-2xl text-white outline-none cursor-not-allowed"
                    />
                    <button
                        onClick={() => handleOpenTokenModal('buy')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white
                      px-4 py-2 rounded-[20px] flex items-center gap-2
                      text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px]"
                    >
                      {selectedBuyToken ? (
                          <>
                            <Image
                                src={selectedBuyToken.logo}
                                alt={selectedBuyToken.symbol}
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded-full"
                            />
                            <span>{selectedBuyToken.symbol}</span>
                          </>
                      ) : (
                          <span>Select token</span>
                      )}
                      <ChevronDown className="h-5 w-5 flex-shrink-0" />
                    </button>
                    <div className="text-[#9B9B9B] text-sm mt-1">$0</div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                    className="w-full bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white py-6 rounded-[20px]
                  text-lg font-semibold"
                    onClick={handleNextStep}
                >
                  {currentStep === 1 ? 'Review Swap' : currentStep === 2 ? 'Confirm Swap' : 'Swap Complete'}
                </Button>
              </div>

              {/* Right Arrow for Side Panel */}
              <button
                  onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                  className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full ml-4"
              >
                {isSidePanelOpen ? (
                    <ChevronLeft className="h-6 w-6 text-white" />
                ) : (
                    <ChevronRight className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
            {/* Side Content */}
            <div
                className={`absolute top-1/2 -translate-y-1/2 left-full ml-4 w-full max-w-md bg-[#1E2128] rounded-3xl p-6 transform transition-transform duration-300 ease-in-out ${
                    isSidePanelOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
              <h2 className="text-2xl font-bold mb-4">Additional Info</h2>
              <p className="text-gray-400">
                This panel can contain additional information or settings for the swap.
              </p>
            </div>
          </div>

          {/* Token Selection Modal */}
          <TokenSelectModal
              isOpen={isTokenModalOpen}
              onClose={() => setIsTokenModalOpen(false)}
              onSelect={handleTokenSelect}
          />
        </div>
      </HeaderFooter>
  )
}


