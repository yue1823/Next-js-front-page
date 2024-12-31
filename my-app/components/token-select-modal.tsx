"use client"

import { Search } from 'lucide-react'
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import APt_logo from ".//logo/Aptos_mark_BLK.svg";

interface Token {
  symbol: string
  name: string
  logo: string
}

interface TokenSelectModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (token: Token) => void
}

const popularTokens: Token[] = [
  { symbol: "APT", name: "Ethereum", logo:APt_logo },
  { symbol: "USDT", name: "Tether", logo: "/placeholder.svg?height=40&width=40" },
  { symbol: "USDC", name: "USD Coin", logo: "/placeholder.svg?height=40&width=40" },
]

export function TokenSelectModal({ isOpen, onClose, onSelect }: TokenSelectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#191B1F] border-[#2C2F36] p-0">
        <DialogHeader className="p-4 border-b border-[#2C2F36]">
          <DialogTitle className="text-xl font-semibold text-white">Select a token</DialogTitle>
        </DialogHeader>
        
        <div className="p-4">
          <div className="relative mb-4">
            <Input 
              placeholder="Search name or paste address"
              className="bg-[#212429] border-[#2C2F36] pl-10 py-6 text-white placeholder:text-gray-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-400 mb-2">Popular tokens</div>
            {popularTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => {
                  onSelect(token)
                  onClose()
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#212429] transition-colors"
              >
                <Image
                  src={token.logo}
                  alt={token.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col items-start">
                  <span className="text-white font-medium">{token.symbol}</span>
                  <span className="text-sm text-gray-400">{token.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

