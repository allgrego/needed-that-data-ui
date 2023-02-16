import { MonitorHistoryRatesData } from "./monitor-dolar.types"

export const fetchRatesHistoryInVes = async (): Promise<MonitorHistoryRatesData> => {
    try {
        const url = `api/monitor-dolar/rates`

        const response = await fetch(url, {
            method: 'GET'
        })

        if (!response.ok) {
            throw new Error(`There was an error fetching Monitor Dolar rates data (${response.status} | ${response.statusText})`)
        }

        const ratesData: MonitorHistoryRatesData = await response.json()

        return ratesData
    } catch (error) {
        console.error(error);
        throw error
    }
}
