export default function Dashboard() {
  return (
      <div className="w-full h-full flex flex-col p-4">
        <div className="flex-grow bg-[#1E2128] rounded-3xl p-4 mb-4">
          <div className="w-full h-full" id="tradingview_chart" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-1/3">
          <div className="bg-purple-700/20 rounded-2xl p-4 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-white mb-2">Market Overview</h2>
            <p className="text-sm text-gray-400 text-center">
              View detailed market analysis and trends
            </p>
          </div>
          <div className="bg-purple-700/20 rounded-2xl p-4 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-white mb-2">Portfolio Performance</h2>
            <p className="text-sm text-gray-400 text-center">
              Track your investments and performance metrics
            </p>
          </div>
        </div>
      </div>
  )
}

