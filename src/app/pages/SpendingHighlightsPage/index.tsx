import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { match } from 'ts-pattern'

import { getYearToDate } from "@/lib/utils/date";
import { fetchUserChartsOpts } from "@/app/routes/_authenticated/spending-highlights";

import { CardTotals } from "./components/CardTotals";
import { MonthlyChart } from "./components/MonthlyChart";
import { CurrentMonthTopPurchase } from "./components/CurrentMonthTopPurchase"

const defaultValues = {
  highestPurchase: '0',
  monthlyAvg: '0',
  overallAmount: '0',
  ytdAmount: '0',
}

export function SpendingHighlightPage() {

  const queryClient = useQueryClient()
  const { startDate, endDate } = getYearToDate()
  const { isFetching, ...query } = useQuery(fetchUserChartsOpts(startDate, endDate))

  const monthlyExpenses = query.data && query.data.success ? query.data.data.monthly_expenses : []
  const topExpenses = query.data && query.data.success ? query.data.data.top_expenses : []
  const totals = match(query.data)
    .with({ success: false }, () => ({ ...defaultValues }))
    .with({ success: true }, (data) => ({
      highestPurchase: data.data.highest_purchase,
      monthlyAvg: data.data.monthly_avg,
      overallAmount: data.data.overall_amount,
      ytdAmount: data.data.ytd_amount,
    }))
    .otherwise(() => ({ ...defaultValues }))


  return (
    <div className="min-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-left text-2xl font-bold ">Spending Highlights</h1>
        <div className="flex gap-2 items-center justify-center" >
          <SlidersHorizontal className='cursor-pointer h-5 w-5' />
          <RotateCcw onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ['fetchUserChartsOpts', startDate, endDate]
            })
          }} className='cursor-pointer h-5 w-5' />
        </div>
      </div>

      <CardTotals data={totals} isLoading={isFetching} />
      <MonthlyChart isLoading={isFetching} data={monthlyExpenses} />
      <CurrentMonthTopPurchase isLoading={isFetching} data={topExpenses} />
    </div>
  )
}
