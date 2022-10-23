import { FC, ReactElement, useEffect, useState } from "react";
import { BcvRatesProps } from "./bcvRates.types";
import { CurrencyDollarIcon, CurrencyEuroIcon } from '@heroicons/react/20/solid'
import { getParsedTimeDiff, getSecondsDiff } from "../../utils/time";
import BcvRatesSkeleton from "../skeleton/BcvRatesSkeleton";

const BcvRates: FC<BcvRatesProps> = ({ ratesData }) => {


    const [timeDiff, setTimediff] = useState<Record<string, number | string>>({
        time: '',
        unit: ''
    })

    useEffect(() => {

        const lastUpdateDate = new Date(ratesData?.currentTimestamp)

        const interval = setInterval(() => {
            const now = new Date()

            const timeDiff = getParsedTimeDiff(lastUpdateDate, now)

            if (timeDiff.timeDiff < 10 || timeDiff.timeDiff % 20 === 0) {
                setTimediff({
                    ...timeDiff
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [ratesData])


    if (!ratesData) {
        return <BcvRatesSkeleton />
    }

    // Reference currency (VES)
    const { currency } = ratesData

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
    const rates: Record<string, any>[] = Object.entries(ratesData.rates).map(([code, value]) => {
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
            {/* <div className="text-right text-sm mt-5 font-medium text-gray-600">Last update: {new Date(ratesData.currentTimestamp).toLocaleString('en-GB')}</div> */}
            <div className="text-right text-sm mt-5 font-medium text-gray-500 mb-10">Last update: {Number(timeDiff.timeDiff) < 10 && timeDiff.unit === 'seconds' || !timeDiff?.timeDiff ? 'Just now' : `${timeDiff.timeDiff} ${timeDiff.unit} ago`}</div>
        </>

    );
}

export default BcvRates;