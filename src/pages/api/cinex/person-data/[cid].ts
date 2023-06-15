// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getRoute } from "@/common/utils/routes";

import { HttpErrorResponse } from "@/common/types/fetch.types";
import {
  CinexPersonDataApiResponse,
  CinexPersonDataApiResponseData,
  CinexUserData,
} from "@/modules/nationalIdentity/types/cinex.types";
import { NationalityCodes } from "@/modules/nationalIdentity/utils/cid";
import { parseCinexUserData } from "@/modules/nationalIdentity/utils/cinex";

type Data = CinexUserData | HttpErrorResponse;

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
    const { cid: receivedCid } = req.query;

    let cid = String(receivedCid);

    if (cid.startsWith("V")) {
      cid = cid.substring(1);
    }

    const url = getRoute("service-cinex-get-person-info-by-cid", [cid]);

    console.log("Fetching from", url);

    const response = await fetch(url, {
      method: "GET",
    });

    // Just to know if there is a response
    if (!response.ok) {
      errorResponse.error.code = response.statusText;
      errorResponse.error.message = `Error fetching data from ${url}...`;
      console.log("Error response message", await response.text());
      res.status(response.status).json(errorResponse);
      return;
    }

    const obtainedData: CinexPersonDataApiResponse = await response.json();

    const userCinexData: CinexPersonDataApiResponseData = obtainedData.response;

    if (typeof userCinexData !== "string") {
      const userData: CinexUserData = parseCinexUserData(userCinexData);
      res.status(200).json(userData);
      return;
    }

    // Retry with a 'V' prefix on the CID
    if (!cid.startsWith(NationalityCodes.VENEZUELAN)) {
      // Add 'V' as prefix to CID
      const newCid = `${NationalityCodes.VENEZUELAN}${cid}`;
      // New URL with new CID
      const url = getRoute("service-cinex-get-person-info-by-cid", [newCid]);

      const response = await fetch(url, {
        method: "GET",
      });

      // Just to know if there is a OK response
      if (!response.ok) {
        errorResponse.error.code = response.statusText;
        errorResponse.error.message = `Error fetching data from ${url}...`;
        console.log("Error response message", await response.text());
        res.status(response.status).json(errorResponse);
        return;
      }

      const obtainedData: CinexPersonDataApiResponse = await response.json();

      const userCinexData: CinexPersonDataApiResponseData =
        obtainedData.response;

      if (typeof userCinexData !== "string") {
        const userData: CinexUserData = parseCinexUserData(userCinexData);
        res.status(200).json(userData);
        return;
      }
    }

    // If none 404
    errorResponse.error.code = "NOT FOUND";
    errorResponse.error.message = `User not found for provided info`;

    res.status(404).json(errorResponse);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse);
  }
}
