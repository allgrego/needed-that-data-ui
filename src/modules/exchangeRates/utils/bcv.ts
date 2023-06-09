import { debugErrorLog } from "@/common/utils/debug";
import { getRoute } from "@/common/utils/routes";
import { BcvRatesInfo } from "@/modules/exchangeRates/types/bcv.types";

export const fetchRatesInVes = async (): Promise<BcvRatesInfo> => {
  try {
    const url = getRoute("api-rates-bcv-get-rates");

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`There was an error fetching BCV rates data`);
    }

    const ratesData: BcvRatesInfo = await response.json();

    // Fix to N decimals
    Object.entries(ratesData.rates).forEach(([code, rate]) => {
      const decimals = 2;
      ratesData.rates[code] = (Math.round(Number(rate) * 100) / 100).toFixed(
        decimals
      );
    });

    return ratesData;
  } catch (error) {
    debugErrorLog("Failure fetching BCV rates in VES", error);
    throw error;
  }
};
