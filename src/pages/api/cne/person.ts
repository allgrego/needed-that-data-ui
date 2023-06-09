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

  try {
    const url = `${getRoute(
      "service-cne-cid-search"
    )}?nat=${nationality}&num=${number}`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (response.status === 400) {
      errorResponse.error.code = response.statusText;
      errorResponse.error.message = `Bad arguments. From ${url}...`;
      try {
        const jsonResponse = await response.json();
        console.log({ jsonResponse });
      } catch (error) {
        console.log("Invalid JSON error response...");
      }
      res.status(response.status).json(errorResponse);
      return;
    }

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

    const personData: PersonDataCne | HttpErrorResponse | undefined =
      await response.json();

    res.status(response.status).json(personData);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse);
  }
}
