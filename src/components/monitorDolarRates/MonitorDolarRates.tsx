import { CurrencyDollarIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, Bars2Icon } from "@heroicons/react/20/solid";
import { FC } from "react";
import BcvRatesSkeleton from "../skeleton/BcvRatesSkeleton";
import { MonitorDolarRatesProps } from "./monitorDolarRates.types";

const MonitorDolarRates: FC<MonitorDolarRatesProps> = ({ ratesHistoryData }) => {

    if (!ratesHistoryData) return <BcvRatesSkeleton />

    const [lastRate, beforeLastRate] = ratesHistoryData.rates

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
                                                <div className="inline-block font-bold text-green-800 text-md"><ArrowTrendingUpIcon className="h-5 w-5 inline" /> <span>{differencePercentage.toFixed(2)}%</span></div>
                                            )
                                    )
                            }
                                {/* <div className="inline-block font-bold text-gray-900 text-md">{isTrendingUp ? <ArrowTrendingUpIcon className="h-5 w-5 inline" /> : isEqual ? '=' : 'abajo'} <span>{differencePercentage.toFixed(2)}%</span></div> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="text-right text-sm mt-5 font-medium text-gray-500 mb-10">Last update: {lastRateDate.toLocaleString("en-GB")}</div>
        </>
    );
}

export default MonitorDolarRates;