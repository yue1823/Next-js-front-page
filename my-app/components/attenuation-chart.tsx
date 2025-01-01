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

        const d = 3; // 第幾天開始指數增長
        const e = 28 / Math.log(3); // 使指數增長在第30天達到1
        const c = 1; // 第30天後的值

        const xValues = [];
        const yValues = [];

        for (let x = 1; x <= 30; x++) {
            let y;
            if (x < d) {
                y = 0.2; // 第一天和第二天為0.2
            } else if (x === 30) {
                y = c; // 第30天確保為1
            } else {
                // 指數增長部分
                y = 0.2 * Math.pow(5, (x - d) / e);
            }
            if(y < 1){
                yValues.push(y);
            }else{
                yValues.push(1);
            }
            xValues.push(x);
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

    return <div ref={chartContainerRef} className="w-full h-full" />
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

    return <div ref={chartContainerRef}  className="w-full h-full" />
}