'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
    const page2Ref = useRef<HTMLDivElement>(null)
    const page3Ref = useRef<HTMLDivElement>(null)

    const scrollToPage = (pageRef: React.RefObject<HTMLDivElement>) => {
        pageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const currentPage = Math.floor(scrollPosition / windowHeight) + 1

            // Update URL hash based on current page
            window.history.replaceState(null, '', `#page${currentPage}`)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="bg-[#1a1b23] text-white">
            {/* Navigation buttons */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center space-x-4 p-4 bg-[#1a1b23] bg-opacity-80">
                <Button variant="outline" onClick={() => scrollToPage(page2Ref)}>
                    About
                </Button>
                <Button variant="outline" onClick={() => scrollToPage(page3Ref)}>
                    Features
                </Button>
                <Button variant="outline" onClick={() => scrollToPage(page3Ref)}>
                    Contact
                </Button>
            </div>

            {/* Page 1 */}
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="flex flex-col-reverse md:flex-row w-full max-w-7xl items-center">
                    <div className="w-full md:w-2/3 pr-0 md:pr-8 mt-8 md:mt-0">
                        <h1 className="text-2xl md:text-4xl font-bold mb-4">Welcome to Our Crypto Platform</h1>
                        <p className="text-base md:text-xl text-gray-300 mb-6">
                            Experience the future of decentralized finance with our cutting-edge crypto trading and management tools.
                        </p>
                        <Button asChild>
                            <Link href="/dashboard">Get Started</Link>
                        </Button>
                    </div>
                    <div className="w-full md:w-1/3 aspect-square bg-gray-800 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                            GIF Placeholder
                        </div>
                    </div>
                </div>
            </div>

            {/* Page 2 */}
            <div ref={page2Ref} className="min-h-screen flex flex-col items-center justify-center p-4">
                {/* Logo Carousel */}
                <div className="w-full bg-gray-900 py-8 overflow-hidden mb-12">
                    <div className="flex animate-carousel">
                        {[1, 2, 3].map((logo) => (
                            <div key={logo} className="flex-shrink-0 w-48 h-24 mx-8 bg-gray-800 rounded flex items-center justify-center">
                                Logo {logo}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Founders Section */}
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Meet Our Founders</h2>
                <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-12">
                    {[1, 2].map((founder) => (
                        <div key={founder} className="text-center max-w-sm">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gray-800 mb-4 mx-auto"></div>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Founder {founder}</h3>
                            <p className="text-sm md:text-base text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Page 3 */}
            <div ref={page3Ref} className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
                    {[
                        { title: "Advanced Trading", description: "Access powerful trading tools and real-time market data for informed decision-making." },
                        { title: "Secure Wallet", description: "Store your crypto assets safely with our state-of-the-art, multi-layer security system." },
                        { title: "Cross-Chain Swaps", description: "Effortlessly exchange assets across different blockchain networks with our intuitive interface." }
                    ].map((feature, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-lg md:text-xl font-semibold mb-4">{feature.title}</h3>
                            <p className="text-sm md:text-base text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

