import { FC, ReactElement, useEffect, useState } from "react";
import { CurrencyDollarIcon, CurrencyEuroIcon } from '@heroicons/react/20/solid'
import { getParsedTimeDiff, getSecondsDiff } from "../../utils/time";
import BcvRatesSkeleton from "../skeleton/BcvRatesSkeleton";
import { BcvRatesInfo } from "../../utils/bcv.types";
import EmptyMessage from "../emptyMessage/EmptyMessage";
import useMomentsAgo from "../../hooks/useMomentsAgo";
import Spinner from "../spinner/Spinner";
interface BcvRatesProps {
    ratesData?: BcvRatesInfo
    isLoading?: boolean
    isError?: boolean
    isFetching?: boolean
    isFetched?: boolean
    dataUpdatedAt?: number
}

const BcvRates: FC<BcvRatesProps> = ({ ratesData: data, isError = false, isFetching = false, isFetched = false, dataUpdatedAt = 0 }) => {

    // const { timeDiff, unit } = useMomentsAgo(dataUpdatedAt)

    // When error
    if (isError) return <EmptyMessage>Service unavailable😢</EmptyMessage>
    // First loading
    if (!isFetched && isFetching) return <BcvRatesSkeleton />
    // Retrying loading
    if (isFetched && !data && isFetching) return <EmptyMessage><Spinner />Retrying...</EmptyMessage>
    // Already fetched but no data
    if (!data) return <EmptyMessage>No data available</EmptyMessage>

    // Reference currency (VES)
    const { currency } = data

    const currenciesNames: Record<string, string> = {
        usd: 'American Dollar',
        eur: 'Euro',
        ves: 'Venezuelan Bolivar'
    }

    const currenciesIcons: Record<string, ReactElement> = {
        usd: <CurrencyDollarIcon />,
        eur: <CurrencyEuroIcon />,
    }


    // Array of rates info
    const rates: Record<string, any>[] = Object.entries(data.rates).map(([code, value]) => {
        return {
            code,
            name: currenciesNames[code],
            rate: value
        }
    })


    return (

        <>
            <div className="overflow-x-auto relative shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-100  bg-indigo-600">
                        <tr>
                            <th scope="col" className="py-3 px-6" colSpan={2}>
                                Currency
                            </th>
                            <th scope="col" className="py-3 px-6">
                                {currency} rate
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rates.map(({ rate, code, name }) => (
                                <tr key={code} className="bg-slate-100 border-b hover:bg-gray-50">
                                    <td className="py-4 px-6 text-gray-800 font-medium whitespace-nowrap">
                                        <div className="h-8 w-8 inline-block text-indigo-800">{currenciesIcons[code]}</div> {String(code).toUpperCase()}
                                    </td>
                                    <td scope="row" className="py-4 px-4 text-xs">
                                        {name}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="inline-block font-bold text-gray-900 text-lg">{rate}</div> <span className="text-xs scale-50">{currency}/{String(code).toUpperCase()}</span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="text-right text-sm mt-5 font-medium text-gray-500 mb-2">Published at: {data.bcvDate ? new Date(data.bcvDate + 'T08:00:00.000Z').toLocaleDateString('en-GB') : '-'}</div>
            <div className={`text-right text-xs mt-2 font-base text-gray-500 mb-10 ${isFetching && 'animate-pulse'}`}>Updated at: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString("en-GB") : '-'}</div>
            {/* <div className={`text-right text-xs mt-2 font-base text-gray-500 mb-10${isFetching && 'animate-pulse'}`}>Updated at: {Number(timeDiff) < 10 && unit === 'seconds' || !timeDiff ? 'Just now' : `${timeDiff} ${unit} ago`}</div> */}
        </>

    );
}

export default BcvRates;