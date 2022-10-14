import { BcvRatesInfo } from "./bcv.types"

export const fetchRatesInVes = async (): Promise<BcvRatesInfo> => {
    try {
        const url = `/api/bcv/rates?`

        const response = await fetch(url, {
            method: 'GET'
        })

        if (!response.ok) {
            throw new Error(`There was an error fetching BCV rates data`)
        }

        const ratesData: BcvRatesInfo = await response.json()

        // Fix to N decimals
        Object.entries(ratesData.rates).forEach(([code, rate]) => {
            const decimals = 3
            ratesData.rates[code] = (Math.round(Number(rate) * 100) / 100).toFixed(decimals);
        })

        return ratesData

    } catch (error) {
        console.error(error);
        throw error
    }
}
