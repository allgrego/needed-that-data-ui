// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { PersonDataCne } from "@/modules/nationalIdentity/types/cne.types";
import { HttpErrorResponse } from "@/common/types/fetch.types";
import { getRoute } from "@/common/utils/routes";

type Data = PersonDataCne | undefined | HttpErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const nationality = String(req.query.nat);
  const number = String(req.query.num);

  let errorResponse: HttpErrorResponse = {
    error: {
      code: "internal",
      message: "INTERNAL",
    },
  };

  let status = 500;

  try {
    const url = `${getRoute(
      "service-cne-cid-search"
    )}?nat=${nationality}&num=${number}`;

    const response = await fetch(url, {
      method: "GET",
    });

    status = response.status;
    errorResponse.error.code = response.statusText;

    if (response.status === 400) {
      errorResponse.error.message = `Bad arguments. From ${url}...`;
      try {
        const jsonResponse = await response.json();
        console.log({ jsonResponse });
      } catch (error) {
        console.log("Invalid JSON error response...");
      }

      throw new Error("Bad argument service response");
    }

    if (response.status === 503) {
      errorResponse.error.message = `Service unavailable`;
      throw new Error("Service is not available");
    }

    if (!response.ok) {
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

    const personData: PersonDataCne | HttpErrorResponse | undefined =
      await response.json();

    res.status(response.status).json(personData);
    return;
  } catch (error) {
    console.error("Failure fetching a person data", error);
    res.status(status).json(errorResponse);
  }
}
