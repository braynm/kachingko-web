import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { queryOptions } from '@tanstack/react-query'

import { SpendingHighlightPage } from '@/app/pages/SpendingHighlightsPage'
import { useAppSession } from '@/lib/session'
import { API_URL, makeApiClient } from '@/lib/utils/api'

export const Route = createFileRoute('/_authenticated/spending-highlights/')({
  component: RouteComponent,
})

export const fetchUserChartsOpts = (startDate: string, endDate: string) => queryOptions({
  queryKey: ['fetchUserChartsOpts', startDate, endDate],
  queryFn: () => fetchUserChartsFn({ data: { startDate, endDate } }),
})

const chartsSchema = z.object({
  success: z.boolean(),
  data: z.object({
    highest_purchase: z.string(),
    monthly_avg: z.string(),
    overall_amount: z.string(),
    ytd_amount: z.string(),
    monthly_expenses: z.array(z.object({
      amount: z.number(),
      total_txns: z.number(),
      month: z.string(),
      name: z.string().nullable(),
    })),
    top_expenses: z.array(z.object({
      amount: z.number(),
      sale_date: z.string(),
      details: z.string(),
    }))
  })
})

export const fetchUserChartsFn = createServerFn({
  method: 'GET'
})
  .validator((data: { startDate: string, endDate: string }) => data)
  .handler(async ({ data: { startDate, endDate } }: { data: { startDate: string, endDate: string } }) => { // Use data property
    const session = await useAppSession()
    const sessionData = session.data
    const client = makeApiClient({
      baseUrl: API_URL,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}` // Token passed from loader
      }
    })

    const url = `/api/charts?start_date=${startDate}&end_date=${endDate}`
    const request = await client.request(url, chartsSchema)()
    console.log('API REQUEST LOGGING USER CHARTS REQUEST: ', url)

    const response = client.handleResponse(request)
    return response
  })

function RouteComponent() {
  return <SpendingHighlightPage />
}
