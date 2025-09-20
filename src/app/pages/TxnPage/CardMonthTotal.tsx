import { TrendingUp, ArrowUpRight, BanknoteX, TrendingDown, Minus } from 'lucide-react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { queryOptions, useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card"

import { formatAmount } from '@/lib/utils/amount'
import { fetchTxnDailyTrendFn } from '@/app/routes/_authenticated/txns'
import { Skeleton } from '@/app/components/ui/skeleton'
import { EmptyData } from '@/app/components/EmptyData'
import { format, parseISO } from 'date-fns'

const formatDate = (date: string) => format(parseISO(date), "MMM yyyy")

type CardMonthTotalProps = {
  startDate: string,
  endDate: string,
  title: string
}


export const fetchTxnDailyTrendQueryOpts = (startDate: string, endDate: string) => queryOptions({
  queryKey: ['txnsDailyTrend', startDate, endDate],
  queryFn: () => fetchTxnDailyTrendFn({ data: { startDate, endDate } }),
})

function CardMonthTotalSkeletonLoading() {
  return <Card className="border mb-5 min-h-[255px] min-w-[263px]">
    <CardContent className="p-6">
      <div className="space-y-3">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </CardContent>
  </Card>
}

function CardEmptyData({ date }: { date: string }) {
  return <Card className="border mb-5 min-w-[263px] max-w-[263px]">
    <CardContent className='text-left gap-2'>
      <div className='flex flex-col'>
        <p className='flex gap-1 text-xs font-medium items-center text-muted-foreground mb-5'>
          {date}
        </p>
        <EmptyData emptyIcon={BanknoteX} title='No Transactions' />
      </div>
    </CardContent>
  </Card>
}

export function CardMonthTotal(props: CardMonthTotalProps) {
  const reqQuery = useQuery(fetchTxnDailyTrendQueryOpts(props.startDate, props.endDate))
  const { startDate, title } = props
  const { data } = reqQuery

  if (reqQuery.isLoading) {
    return <CardMonthTotalSkeletonLoading />
  }

  if (!data?.success || (data?.success && data?.data?.daily_spent.length === 0)) {
    return <CardEmptyData date={startDate} />
  }

  const pct = (percentage: string) => {
    if (percentage === '-') {
      return <Minus className='h4 w-4' />
    }

    if (parseInt(percentage) > 0) {
      return <>
        <TrendingUp className='h-4 w-4' />
        {spent_pct}%
      </>
    }

    return <>
      <TrendingDown className='h-4 w-4' />
      {spent_pct}%
    </>
  }

  const { data: { spent_pct, daily_spent } } = data

  return (
    <Card className="border mb-5 min-w-[263px] max-w-[263px]">
      <CardContent className='text-left gap-2'>
        <div className='flex items-between mb-5'>
          <p className='flex gap-1 text-xs font-medium items-center text-muted-foreground'>
            {formatDate(startDate)}
          </p>
          <p className='flex ml-auto gap-1 text-xs font-medium items-center text-muted-foreground'>
            {pct(spent_pct)}
          </p>
        </div>
        <p className='text-xs uppercase text-muted-foreground font-semibold tracking-tight'>{title}</p>
        <p className='text-2xl font-bold mb-5'>{formatAmount(daily_spent.reduce((amt: number, acc: number) => acc + amt))}</p>
        <Sparklines data={daily_spent} limit={31} margin={0}>
          <SparklinesLine color="#b8bb26" />
        </Sparklines>
      </CardContent>
      <CardFooter>
        <p className='flex text-sm text-muted-foreground items-center'>
          View Insights <ArrowUpRight className='font-muted h-4 w-4' />
        </p>
      </CardFooter>
    </Card>
  )
}
