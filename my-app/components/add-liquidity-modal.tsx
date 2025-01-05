"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown } from 'lucide-react'
import Image from "next/image"
import { TokenSelectModal, popularTokens } from "./token-select-modal"

interface Token {
    symbol: string
    name: string
    logo: string
}

interface AddLiquidityModalProps {
    isOpen: boolean
    onClose: () => void
    poolTokens?: {
        token1: Token
        token2: Token
    }
}

export function AddLiquidityModal({ isOpen, onClose, poolTokens }: AddLiquidityModalProps) {
    const [token1Amount, setToken1Amount] = useState("")
    const [token2Amount, setToken2Amount] = useState("")
    const [isTokenModalOpen, setIsTokenModalOpen] = useState(false)
    const [activeTokenSelect, setActiveTokenSelect] = useState<'token1' | 'token2'>('token1')
    const [selectedToken1, setSelectedToken1] = useState<Token | null>(poolTokens?.token1 || popularTokens[0])
    const [selectedToken2, setSelectedToken2] = useState<Token | null>(poolTokens?.token2 || popularTokens[1])
    const [estimatedLPTokens, setEstimatedLPTokens] = useState("0.00")

    useEffect(() => {
        if (token1Amount && token2Amount) {
            const estimated = Math.sqrt(parseFloat(token1Amount) * parseFloat(token2Amount)).toFixed(2)
            setEstimatedLPTokens(estimated)
        } else {
            setEstimatedLPTokens("0.00")
        }
    }, [token1Amount, token2Amount])

    const handleTokenSelect = (token: Token) => {
        if (activeTokenSelect === 'token1') {
            setSelectedToken1(token)
        } else {
            setSelectedToken2(token)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#1E1E1E] text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Add Liquidity</DialogTitle>
                </DialogHeader>
                <div className="mt-6 space-y-4">
                    {/* Token 1 Input */}
                    <div className="space-y-2">
                        <label htmlFor="token1-input" className="text-sm font-medium text-gray-400">{selectedToken1?.name || 'Select token'}</label>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <Input
                                    id="token1-input"
                                    type="number"
                                    value={token1Amount}
                                    onChange={(e) => setToken1Amount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-[#2C2F36] border-[#3F3F3F] text-white"
                                />
                                <button
                                    onClick={() => {
                                        setActiveTokenSelect('token1')
                                        setIsTokenModalOpen(true)
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3F3F3F] hover:bg-[#4F4F4F] text-white px-2 py-1 rounded-md flex items-center space-x-1"
                                    aria-label="Select token 1"
                                >
                                    {selectedToken1 && (
                                        <Image
                                            src={selectedToken1.logo}
                                            alt={selectedToken1.symbol}
                                            width={20}
                                            height={20}
                                            className="rounded-full"
                                        />
                                    )}
                                    <span>{selectedToken1?.symbol || 'Select'}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Token 2 Input (Disabled) */}
                    <div className="space-y-2">
                        <label htmlFor="token2-input" className="text-sm font-medium text-gray-400">{selectedToken2?.name || 'Select token'}</label>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <Input
                                    id="token2-input"
                                    type="number"
                                    value={token2Amount}
                                    disabled
                                    placeholder="0.00"
                                    className="w-full bg-[#2C2F36] border-[#3F3F3F] text-white opacity-50 cursor-not-allowed"
                                />
                                <button
                                    onClick={() => {
                                        setActiveTokenSelect('token2')
                                        setIsTokenModalOpen(true)
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3F3F3F] hover:bg-[#4F4F4F] text-white px-2 py-1 rounded-md flex items-center space-x-1"
                                    aria-label="Select token 2"
                                >
                                    {selectedToken2 && (
                                        <Image
                                            src={selectedToken2.logo}
                                            alt={selectedToken2.symbol}
                                            width={20}
                                            height={20}
                                            className="rounded-full"
                                        />
                                    )}
                                    <span>{selectedToken2?.symbol || 'Select'}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Estimated LP Tokens */}
                    <div className="bg-[#2C2F36] rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Estimated LP Tokens</span>
                            <span className="text-lg font-medium">{estimatedLPTokens}</span>
                        </div>
                    </div>

                    {/* Add Liquidity Button */}
                    <Button
                        onClick={onClose}
                        className="w-full bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white py-6 rounded-lg text-lg font-semibold"
                    >
                        Add Liquidity
                    </Button>
                </div>
            </DialogContent>

            <TokenSelectModal
                isOpen={isTokenModalOpen}
                onClose={() => setIsTokenModalOpen(false)}
                onSelect={(token) => {
                    handleTokenSelect(token)
                    setIsTokenModalOpen(false)
                }}
            />
        </Dialog>
    )
}

