'use client'

import { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'

interface AttenuationChartProps {
    b: number // growth rate
    a: number // stopping point
}

interface ExponentialDecayChartProps {
    A: number // 振幅
    k: number // 衰减系数
    C: number // 水平偏移量
}

export function AttenuationChart({ b, a }: AttenuationChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chartContainerRef.current) return

        const c = Math.exp(b * a)

        // Generate data points
        const xValues = []
        const yValues = []

        for (let x = 0; x <= 10; x += 0.1) {
            let y;
            if (x < a) {
                y = Math.exp(b * x);
            } else {
                y = c;
            }
            yValues.push(y)
            xValues.push(x)
        }

        const data = [{
            x: xValues,
            y: yValues,
            mode: 'lines',
            line: {
                color: '#FF53C9',
                width: 2
            }
        }]

        const layout = {
            title: {

                font: {
                    color: '#FFFFFF'
                }
            },
            paper_bgcolor: '#2C2F36',
            plot_bgcolor: '#2C2F36',
            font: {
                color: '#FFFFFF'
            },
            xaxis: {
                title: '%',
                gridcolor: '#404040',
                zerolinecolor: '#404040'
            },
            yaxis: {
                title: 'λ',
                gridcolor: '#404040',
                zerolinecolor: '#404040'
            },
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
            },
            autosize: true
        }

        const config = {
            responsive: true,
            displayModeBar: false
        }

        Plotly.newPlot(chartContainerRef.current, data, layout, config)

        const handleResize = () => {
            if (chartContainerRef.current) {
                Plotly.Plots.resize(chartContainerRef.current);
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            if (chartContainerRef.current) {
                window.removeEventListener('resize', handleResize);
                Plotly.purge(chartContainerRef.current);
            }
        }
    }, [a, b])

    return <div ref={chartContainerRef} className="w-5/12 h-full" />
}

export function ExponentialDecayChart({ A, k, C }: ExponentialDecayChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chartContainerRef.current) return

        // 生成数据点
        const xValues = [0]
        const yValues = [1]

        for (let x = 0; x <= 100; x += 1) {
            let y = A * Math.exp(-k * x) + C
            yValues.push(y)
            xValues.push(x)
        }
        xValues.push(110)
        yValues.push(0.2)

        const data = [{
            x: xValues,
            y: yValues,
            mode: 'lines',
            line: {
                color: '#FF53C9',
                width: 2
            }
        }]

        const layout = {
            title: {

                font: {
                    color: '#FFFFFF'
                }
            },
            paper_bgcolor: '#2C2F36',
            plot_bgcolor: '#2C2F36',
            font: {
                color: '#FFFFFF'
            },
            xaxis: {
                title: '%',
                gridcolor: '#404040',
                zerolinecolor: '#404040'
            },
            yaxis: {
                title: 'λ',
                gridcolor: '#404040',
                zerolinecolor: '#404040'
            },
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
            },
            autosize: true
        }


        const config = {
            responsive: true,
            displayModeBar: false
        }

        Plotly.newPlot(chartContainerRef.current, data, layout, config)

        const handleResize = () => {
            if (chartContainerRef.current) {
                Plotly.Plots.resize(chartContainerRef.current);
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            if (chartContainerRef.current) {
                window.removeEventListener('resize', handleResize);
                Plotly.purge(chartContainerRef.current);
            }
        }
    }, [A, k, C])

    return <div ref={chartContainerRef}  className="w-5/12 h-full" />
}