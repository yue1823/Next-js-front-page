"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {LOGO} from "@/components/logo/common_logo";

interface Token {
    symbol: string
    name: string
    logo: string
}

const testTokens: Token[] = [
    { symbol: "USDC", name: "Test Ethereum", logo: LOGO.usdc },
    { symbol: "USDT", name: "Test USDT", logo:LOGO.usdt },

]

interface FaucetModalProps {
    isOpen: boolean
    onClose: () => void
}

export function FaucetModal({ isOpen, onClose }: FaucetModalProps) {
    const [selectedToken, setSelectedToken] = useState<Token | null>(null)

    const handleClaim = () => {
        if (selectedToken) {
            console.log(`Claiming ${selectedToken.symbol}`)
            // Here you would handle the actual token claim
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#1E1E1E] text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Claim Test Tokens</DialogTitle>
                </DialogHeader>
                <div className="mt-6 space-y-4">
                    <p className="text-gray-400 text-center">Select a token to claim:</p>
                    <div className="space-y-2">
                        {testTokens.map((token) => (
                            <button
                                key={token.symbol}
                                onClick={() => setSelectedToken(token)}
                                className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                                    selectedToken?.symbol === token.symbol
                                        ? 'bg-[#FF53C9] text-white'
                                        : 'bg-[#2C2F36] text-gray-300 hover:bg-[#3C3F46]'
                                }`}
                            >
                                <div className="flex items-center">
                                    <Image
                                        src={token.logo}
                                        alt={token.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full mr-4"
                                    />
                                    <span className="font-medium">{token.symbol}</span>
                                </div>
                                <span className="text-sm">{token.name}</span>
                            </button>
                        ))}
                    </div>
                    <Button
                        onClick={handleClaim}
                        disabled={!selectedToken}
                        className="w-full bg-[#FF53C9] hover:bg-[#FF53C9]/90 text-white py-6 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Claim Token
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

