import { UseQueryResult } from '@tanstack/react-query';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    ChartOptions,
    ChartData,
} from 'chart.js';

import { Chart } from 'react-chartjs-2';
import { MonitorHistoryRatesData } from '../../utils/monitor-dolar.types';
import { FC } from 'react';
import EmptyMessage from '../emptyMessage/EmptyMessage';
import Spinner from '../spinner/Spinner';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

interface MonitorDolarLineChartProps {
    dataQuery: UseQueryResult<MonitorHistoryRatesData, unknown>
}

// Function to find mean of given array.
function mean(arr: number[], n: number) {
    let sum = 0;

    for (let i = 0; i < n; i++)
        sum = sum + arr[i];
    return sum / n;
}

const MonitorDolarLineChart: FC<MonitorDolarLineChartProps> = ({ dataQuery }) => {
    try {
        // When error
        if (dataQuery.isError) return <EmptyMessage>Chart unavailable⛔</EmptyMessage>
        // First or retry loading
        if ((!dataQuery.isFetched && dataQuery.isFetching) || dataQuery.isFetched && !dataQuery.data && dataQuery.isFetching) {
            return (
                <EmptyMessage>
                    <Spinner />
                </EmptyMessage>
            )
        }
        // Already fetched but no data
        if (!dataQuery.data) return <EmptyMessage>No data available</EmptyMessage>


        const options: ChartOptions = {
            responsive: true,
            scales: {
                xAxis: {
                    ticks: {
                        autoSkip: false,
                        font: {
                            size: 9,
                            weight: 'bold',
                        },
                        maxRotation: 90,
                        minRotation: 65,
                    },
                },
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(47, 47, 47, 0.6)',
                },
                legend: {
                    position: 'top' as const,
                    align: 'end',
                    labels: {
                        borderRadius: 10,
                        color: 'rgba(47, 47, 47, 0.6)',
                        padding: 4,
                    },
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Monitor Dolar Rate History',
                },
            },
        };


        const labels = (dataQuery.data?.rates || []).map((rate) => (new Date(rate.date)).toLocaleString('es-US')).reverse()
        const dataRates = (dataQuery.data?.rates || []).map((rate) => Number(rate.usd)).reverse()
        const meanRates = dataRates.map((r, index) => mean(dataRates, index + 1))

        const data: ChartData = {
            labels,
            datasets: [
                {
                    label: 'Rates',
                    xAxisID: "xAxis",
                    data: dataRates,
                    borderWidth: 3,
                    borderColor: 'rgba(77, 124, 15, 0.5)',
                    backgroundColor: 'rgba(77, 124, 15, 1)',
                    type: 'line' as const,
                    tension: 0.3,
                },
                {
                    label: 'Tendency (mean)',
                    data: meanRates,
                    xAxisID: "xAxis",
                    borderWidth: 1,
                    borderColor: 'rgba(67, 56, 202, 0.5)',
                    backgroundColor: 'rgba(67, 56, 202, 0.5)',
                    pointBorderWidth: 0,
                    pointRadius: 4,
                    borderDash: [5],
                    type: 'line' as const,
                    hidden: true,
                    tension: 0.3
                },
            ],
        };

        return (
            <div className='flex items-center justify-center rounded-lg bg-slate-100/70 shadow-lg px-4 w-full h-full py-4'>
                <Chart options={options} data={data} type='line' />
            </div>
        )
    } catch (error) {
        console.error(error);
        return <EmptyMessage>Something crashed💥</EmptyMessage>
    }
}

export default MonitorDolarLineChart