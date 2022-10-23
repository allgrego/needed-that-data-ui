export interface MonitorDolarRate {
    usd?: number | string | null;
    date: string | number
    [rest: string]: number | string | null | undefined;
}

export interface MonitorHistoryRatesData {
    currency: string;
    rates: MonitorDolarRate[];
    currentTimestamp?: string | any;
}