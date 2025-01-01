import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import "./globals.css"
import { ThemeProvider } from "@/components/Wallet/ThemeProvider";
import { WalletProvider } from "@/components/Wallet/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import {GoogleTagManager} from "@next/third-parties/google";
import { AutoConnectProvider } from "@/components/Wallet/AutoConnectProvider";
import { ReactQueryClientProvider } from '@/components/Wallet/ReactQueryClientProvider';
import Wallet from "./wallet/page";

import type { Metadata } from "next"

import { Inter } from 'next/font/google'
import Link from "next/link"


import DIffusion_logo from "../components/logo/diffusion svg.svg"
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Crypto Dashboard",
    description: "A modern cryptocurrency trading platform",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (

        <html lang="en" className="h-full">
        <body className={`${inter.className} bg-[#1a1b23] h-full flex flex-col`}>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID|| 'G-XXXXXXXXXX'}></GoogleTagManager>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AutoConnectProvider>
                <ReactQueryClientProvider>
                    <WalletProvider>
                        {children}

                    </WalletProvider>
                    <Toaster/>
                </ReactQueryClientProvider>
            </AutoConnectProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
