// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { BACKEND_BASE_URL } from '../../../utils/fetch'
import { HttpErrorResponse } from '../../../utils/fetch.types'
import { MonitorHistoryRatesData } from '../../../utils/monitor-dolar.types'

type Data = any | HttpErrorResponse

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    let errorResponse: HttpErrorResponse = {
        error: {
            code: 'internal',
            message: 'INTERNAL'
        }
    }

    try {
        const url = `${BACKEND_BASE_URL}/v1/monitor-dolar/rates`

        const response = await fetch(url, {
            method: 'GET',
        })

        if (!response.ok) {
            errorResponse.error.code = response.statusText
            errorResponse.error.message = "Error fetching data..."
            res.status(response.status).json(errorResponse)
            return
        }

        const ratesData: MonitorHistoryRatesData = await response.json()

        res.status(response.status).json(ratesData)
        return

    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse)
    }
}
