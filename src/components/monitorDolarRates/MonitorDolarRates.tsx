import { FC } from "react";
import { CurrencyDollarIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, Bars2Icon } from "@heroicons/react/20/solid";
import BcvRatesSkeleton from "../skeleton/BcvRatesSkeleton";
import { MonitorHistoryRatesData } from "../../utils/monitor-dolar.types";
import EmptyMessage from "../emptyMessage/EmptyMessage";
import useMomentsAgo from "../../hooks/useMomentsAgo";
import Spinner from "../spinner/Spinner";

interface MonitorDolarRatesProps {
    ratesHistoryData: MonitorHistoryRatesData | undefined
    isLoading?: boolean
    isError?: boolean
    isFetching?: boolean
    isFetched?: boolean
    dataUpdatedAt?: number
}

const MonitorDolarRates: FC<MonitorDolarRatesProps> = ({ ratesHistoryData: data, isError = false, isFetching = false, isFetched = false, dataUpdatedAt = 0 }) => {

    // const { timeDiff, unit } = useMomentsAgo(dataUpdatedAt)

    // When error
    if (isError) return <EmptyMessage>Service unavailable😢</EmptyMessage>
    // First loading
    if (!isFetched && isFetching) return <BcvRatesSkeleton />
    // Retrying loading
    if (isFetched && !data && isFetching) return <EmptyMessage><Spinner />Retrying...</EmptyMessage>
    // Already fetched but no data
    if (!data) return <EmptyMessage>No data available</EmptyMessage>

    const ratesHistory = data.rates.map((rate) => {
        const actualDate = new Date(rate.date)
        // Set Timezome offset
        const offsetHours = process.env.NEXT_PUBLIC_MONITOR_HOURS_OFFSET ? Number(process.env.NEXT_PUBLIC_MONITOR_HOURS_OFFSET) : 0
        actualDate.setUTCHours(actualDate.getUTCHours() + offsetHours)
        return {
            date: actualDate.toISOString(),
            usd: rate.usd
        }
    })

    const [lastRate, beforeLastRate] = ratesHistory

    const isTrendingUp = Number(lastRate.usd) > Number(beforeLastRate.usd)
    const isEqual = Number(lastRate.usd) === Number(beforeLastRate.usd)
    const differencePercentage = ((Number(lastRate.usd) - Number(beforeLastRate.usd)) / Number(beforeLastRate.usd)) * 100

    const lastRateDate = new Date(lastRate.date)

    return (
        <>
            <div className="overflow-x-auto relative shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-100  bg-lime-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Currency
                            </th>
                            <th scope="col" className="py-3 px-6" colSpan={1}>
                                VES/USD rate
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Trending
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-slate-100 border-b hover:bg-gray-50">
                            <td scope="row" className="py-4 px-6 text-gray-800 font-medium whitespace-nowrap">
                                <div className="h-8 w-8 inline-block text-lime-800"><CurrencyDollarIcon /></div> USD
                            </td>
                            <td className="py-4 px-6" colSpan={1}>
                                <div className="inline-block font-bold text-gray-900 text-lg">{lastRate.usd}</div> <span className="text-xs scale-50"></span>
                            </td>
                            <td className="py-4" colSpan={1}>{
                                // TrendingUp
                                isTrendingUp ? (
                                    <div className="inline-block font-bold text-red-700 text-md"><ArrowTrendingUpIcon className="h-5 w-5 inline" /> <span>{differencePercentage.toFixed(2)}%</span></div>
                                ) :
                                    (
                                        // Stable
                                        isEqual ? (
                                            <div className="inline-block font-bold text-blue-900 text-md"><Bars2Icon className="h-4 w-4 inline" /></div>
                                        ) :
                                            // Trending Down
                                            (
                                                <div className="inline-block font-bold text-green-800 text-md"><ArrowTrendingDownIcon className="h-5 w-5 inline" /> <span>{differencePercentage.toFixed(2)}%</span></div>
                                            )
                                    )
                            }
                                {/* <div className="inline-block font-bold text-gray-900 text-md">{isTrendingUp ? <ArrowTrendingUpIcon className="h-5 w-5 inline" /> : isEqual ? '=' : 'abajo'} <span>{differencePercentage.toFixed(2)}%</span></div> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="text-right text-sm mt-5 font-medium text-gray-500 mb-2">Published at: {lastRateDate.toLocaleString("es-US")}</div>
            <div className={`text-right text-xs mt-2 font-base text-gray-500 mb-10 ${isFetching && 'animate-pulse'}`}>Updated at: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString("en-GB") : '-'}</div>
            {/* <div className={`text-right text-xs mt-2 font-base text-gray-500 mb-10${isFetching && 'animate-pulse'}`}>Updated: {Number(timeDiff) < 10 && unit === 'seconds' || !timeDiff ? 'Just now' : `${timeDiff} ${unit} ago`}</div> */}
        </>
    );
}

export default MonitorDolarRates;