import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'


import { TxnPage } from '@/app/pages/TxnPage'
import { Skeleton } from "@/app/components/ui/skeleton"
import { API_URL, makeApiClient } from "@/lib/utils/api"
import { useAppSession } from '@/lib/session'

const txnEntry = z.object({
  id: z.string().uuid(),
  card: z.string(),
  details: z.string(),
  amount: z.string(),
  sale_date: z.string(),
  posted_date: z.string(),
  user_id: z.number(),
})

const respSchema = z.object({
  success: z.boolean(),
  data: z.object({
    entries: z.array(txnEntry),
    metadata: z.object({
      limit: z.number(),
      next_cursor: z.string().nullable()
    }),
  }),
})

const monthlyTotalAmountSchema = z.object({
  success: z.boolean(),
  data: z.object({
    date: z.string(),
    daily_spent: z.array(z.number()),
    spent_pct: z.string()
  })
})

export const fetchTxnDailyTrendFn = createServerFn({
  method: 'GET'
})
  .validator((data: { startDate: string, endDate: string }) => data) // Add validator for input
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

    const url = `/api/statements/month-summary-spent?start_date=${startDate}&end_date=${endDate}`
    const request = await client.request(url, monthlyTotalAmountSchema)()
    console.log('API REQUEST LOGGING TXN REQUEST: ', url)

    const response = client.handleResponse(request)
    return response
  })

export const fetchTxnsFn = createServerFn({
  method: 'GET'
})
  .validator((data: { page?: string }) => data) // Add validator for input
  .handler(async ({ data: { page } }: { data: { page?: string | undefined } }) => { // Use data property
    const session = await useAppSession()
    const sessionData = session.data
    const client = makeApiClient({
      baseUrl: API_URL,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}` // Token passed from loader
      }
    })

    const url = !page ? '/api/statements/txns?limit=50' : `/api/statements/txns?limit=50&cursor=${page}`
    console.log('API REQUEST LOGGING TXN REQUEST: ', url)

    await new Promise((resolve) => setTimeout(resolve, 1500))
    const request = await client.request(url, respSchema)()

    const response = client.handleResponse(request)

    return response
  })


export const fetchTxnQueryOpts = () => ({
  queryKey: ['txns'],
  initialPageParam: undefined,
  queryFn: ({ pageParam }: { pageParam?: string | undefined }) => fetchTxnsFn({ data: { page: pageParam } }),
  getNextPageParam: (lastPage: any) => {

    const metadata = lastPage?.data?.metadata
    return metadata?.next_cursor || undefined
  },
  onError: (error: any) => {
    console.log({ error })
  }
})

export const Route = createFileRoute('/_authenticated/txns/')({
  component: RouteComponent,
})

export function TableSkeleton({ length }: { length: number }) {
  const skeletonRows = Array.from({ length }, (_, index) => (
    <TableRow key={index} className="odd:bg-muted/50">
      <TableCell className="text-left">
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell className="font-medium text-left">
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell className="text-left">
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell className="text-left">
        <Skeleton className="h-4 w-52" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <Skeleton className="h-4 w-20" />
        </div>
      </TableCell>
    </TableRow>
  ))

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left font-bold">
            <Skeleton className="h-5 w-24" />
          </TableHead>
          <TableHead className="text-left font-bold">
            <Skeleton className="h-5 w-20" />
          </TableHead>
          <TableHead className="text-left font-bold">
            <Skeleton className="h-5 w-20" />
          </TableHead>
          <TableHead className="text-left font-bold">
            <Skeleton className="h-5 w-52" />
          </TableHead>
          <TableHead className="text-right font-bold">
            <div className="flex items-center justify-end gap-1">
              <Skeleton className="h-5 w-20 " />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skeletonRows}
      </TableBody>
    </Table>
  )
}

function RouteComponent() {
  const { queryClient } = Route.useRouteContext()
  return (
    <TxnPage queryClient={queryClient} />
  )
}

