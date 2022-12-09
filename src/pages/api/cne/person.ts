// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PersonDataCne } from '../../../utils/cne.types'
import { BACKEND_BASE_URL } from '../../../utils/fetch'
import { HttpErrorResponse } from '../../../utils/fetch.types'

type Data = PersonDataCne | undefined | HttpErrorResponse

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const nationality = String(req.query.nat)
  const number = String(req.query.num)

  let errorResponse: HttpErrorResponse = {
    error: {
      code: 'internal',
      message: 'INTERNAL'
    }
  }

  try {
    const url = `${BACKEND_BASE_URL}/v1/cne/search/cid?nat=${nationality}&num=${number}`

    const response = await fetch(url, {
      method: 'GET',
    })

    if (response.status >= 500) {
      errorResponse.error.code = response.statusText
      errorResponse.error.message = `Error fetching data from ${url}...`
      try {
        const jsonResponse = await response.json()
        console.log({ jsonResponse });

      } catch (error) {
        console.log('Invalid JSON error response...');
      }
      res.status(response.status).json(errorResponse)
      return
    }

    if (response.status === 400) {
      errorResponse.error.code = response.statusText
      errorResponse.error.message = `Bad arguments. From ${url}...`
      try {
        const jsonResponse = await response.json()
        console.log({ jsonResponse });

      } catch (error) {
        console.log('Invalid JSON error response...');
      }
      res.status(response.status).json(errorResponse)
      return
    }

    const personData: PersonDataCne | HttpErrorResponse | undefined = await response.json()

    res.status(response.status).json(personData)
    return

  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse)
  }
}
