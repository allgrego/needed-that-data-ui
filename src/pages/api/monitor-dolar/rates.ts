// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getRoute } from "@/common/utils/routes";

import { HttpErrorResponse } from "@/common/types/fetch.types";
import { MonitorHistoryRatesData } from "@/modules/exchangeRates/types/monitor-dolar.types";

type Data = any | HttpErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let errorResponse: HttpErrorResponse = {
    error: {
      code: "internal",
      message: "INTERNAL",
    },
  };

  try {
    const url = getRoute("service-monitor-dolar-get-rates");

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      errorResponse.error.code = response.statusText;
      errorResponse.error.message = `Error fetching data from ${url}...`;
      try {
        const jsonResponse = await response.json();
        console.log({ jsonResponse });
      } catch (error) {
        console.log("Invalid JSON error response...");
      }

      res.status(response.status).json(errorResponse);
      return;
    }

    const ratesData: MonitorHistoryRatesData = await response.json();

    res.status(response.status).json(ratesData);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse);
  }
}
