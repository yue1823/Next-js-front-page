"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Token {
    symbol: string
    name: string
    logo: string
}

interface RemoveLiquidityModalProps {
    isOpen: boolean
    onClose: () => void
    poolTokens: {
        token1: Token
        token2: Token
    }
    userLPTokens: string
}

export function RemoveLiquidityModal({ isOpen, onClose, poolTokens, userLPTokens }: RemoveLiquidityModalProps) {
    const [lpTokenAmount, setLpTokenAmount] = useState("")
    const [token1Amount, setToken1Amount] = useState("0.00")
    const [token2Amount, setToken2Amount] = useState("0.00")

    useEffect(() => {
        if (lpTokenAmount && userLPTokens) {
            const ratio = parseFloat(lpTokenAmount) / parseFloat(userLPTokens)
            setToken1Amount((ratio * 100).toFixed(2)) // Assuming 100 tokens for simplicity
            setToken2Amount((ratio * 100).toFixed(2)) // Assuming 100 tokens for simplicity
        } else {
            setToken1Amount("0.00")
            setToken2Amount("0.00")
        }
    }, [lpTokenAmount, userLPTokens])

    const handleConfirm = () => {
        // Here you would handle the actual removal of liquidity
        console.log(`Removing ${lpTokenAmount} LP tokens`)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#1E1E1E] text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Remove Liquidity</DialogTitle>
                </DialogHeader>
                <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="lp-token-input" className="text-sm font-medium text-gray-400">LP Tokens to Remove</label>
                        <Input
                            id="lp-token-input"
                            type="number"
                            value={lpTokenAmount}
                            onChange={(e) => setLpTokenAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-[#2C2F36] border-[#3F3F3F] text-white"
                            max={userLPTokens}
                        />
                        <p className="text-xs text-gray-400">Max: {userLPTokens} LP Tokens</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">You Will Receive</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#2C2F36] rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <Image
                                        src={poolTokens.token1.logo}
                                        alt={poolTokens.token1.symbol}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                    <span className="text-lg font-medium">{token1Amount}</span>
                                </div>
                                <span className="text-sm text-gray-400">{poolTokens.token1.symbol}</span>
                            </div>
                            <div className="bg-[#2C2F36] rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <Image
                                        src={poolTokens.token2.logo}
                                        alt={poolTokens.token2.symbol}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                    <span className="text-lg font-medium">{token2Amount}</span>
                                </div>
                                <span className="text-sm text-gray-400">{poolTokens.token2.symbol}</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleConfirm}
                        className="w-full bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white py-6 rounded-lg text-lg font-semibold"
                    >
                        Confirm Removal
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

