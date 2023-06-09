import { debugErrorLog } from "@/common/utils/debug";
import { getRoute } from "@/common/utils/routes";
import { MonitorHistoryRatesData } from "@/modules/exchangeRates/types/monitor-dolar.types";

export const fetchRatesHistoryInVes =
  async (): Promise<MonitorHistoryRatesData> => {
    try {
      const url = getRoute("api-rates-monitor-dolar-get-rates");

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(
          `There was an error fetching Monitor Dolar rates data (${response.status} | ${response.statusText})`
        );
      }

      const ratesData: MonitorHistoryRatesData = await response.json();

      return ratesData;
    } catch (error) {
      debugErrorLog("Failure fetching Monitor Dolar rates history", error);
      throw error;
    }
  };
