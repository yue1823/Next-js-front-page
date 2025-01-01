import { HeaderFooter } from "@/components/header-footer"
import { TradingChart } from "@/components/trading-chart"

export default function Dashboard() {
    return (
        <HeaderFooter>
            <div className="w-full h-full p-4">
                <div className="w-full h-full bg-[#1E2128] rounded-3xl p-4">
                    <TradingChart />
                </div>
            </div>
        </HeaderFooter>
    )
}

