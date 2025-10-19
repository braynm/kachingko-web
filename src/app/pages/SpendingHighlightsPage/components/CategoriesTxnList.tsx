import { fetchTxnQueryOpts, TableSkeleton } from "@/app/routes/_authenticated/txns";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'
import { staticBanks } from "../../TxnPage";
import { formatDate } from "@/lib/utils/date";
import { formatAmount } from "@/lib/utils/amount";
import { useState } from "react";
import { EmptyData } from "@/app/components/EmptyData";
import { Minus, TableProperties, TrendingUp, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";



export function CategoriesTxnList({ queryClient }) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    data
  } = useInfiniteQuery(fetchTxnQueryOpts())


  const [maskAmt, setEnableMaskAmt] = useState(false)

  const txns = data?.pages
    .filter(page => page.success)
    .flatMap(page => page.data.entries)
    .slice(0, 20)
    ?? [];

  const resetQueries = () => {
    queryClient.resetQueries({ queryKey: ['txns'] })
    queryClient.resetQueries({ queryKey: ['txnsDailyTrend'] })
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-2">
          <h2 className="text-sm text-muted-foreground">Transactions</h2>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-4xl font-black ">₱125K</h2>
            <span className="text-sm flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              +10%
            </span>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex items-center justify-center flex-row cursor-pointer">
            <X className="h-4 w-4" />
            <span className="underline text-sm mr-2">Clear All</span>
          </div>
          <div><Badge className="bg-chart-3 text-green-900">EastWest Plat Cashback</Badge></div>
          <div><Badge variant='outline'>Health & Pharmacy</Badge></div>
        </div>
      </div>
      {isFetching && !isFetchingNextPage && <TableSkeleton length={10} />}
      {
        txns && txns.length > 0 && <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left bold">Card</TableHead>
              <TableHead className="text-left bold">Category</TableHead>
              <TableHead className="text-left bold">Sale Date</TableHead>
              <TableHead className="text-left bold">Post Date</TableHead>
              <TableHead className="text-left bold">Description</TableHead>
              <TableHead className="text-right bold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {txns.map((transaction) => (
              <TableRow key={`${transaction.id} ${transaction.amount}`} className="p-5 odd:bg-muted/50">
                <TableCell className="text-left text-xs">
                  <Badge className={`${staticBanks.find(card => transaction.card === card.name)?.text} ${staticBanks.find(card => transaction.card === card.name)?.variant}`}>
                    {transaction.card}
                  </Badge>
                </TableCell>
                <TableCell className="text-left text-xs">
                  <Badge variant='outline'>
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-left text-xs">{formatDate(transaction.sale_date)}</TableCell>
                <TableCell className="text-left text-xs">{formatDate(transaction.posted_date)}</TableCell>
                <TableCell className="text-left text-xs">{transaction.details}</TableCell>
                <TableCell className="text-right font-medium ">{
                  maskAmt ? formatAmount(transaction.amount).replace(/\d/g, 'X') : formatAmount(transaction.amount)
                }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }


      {
        !isFetching && txns && txns.length === 0 &&
        <div className='mt-[5rem] flex flex-col gap-3'>
          <EmptyData title="Empty Transactions" emptyIcon={TableProperties} />

          <Button onClick={() => resetQueries()} variant='outline' className='border cursor-pointer m-auto'>Refresh</Button>
          <div className="w-[10rem] m-auto relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              or
            </span>
          </div>
          <Button variant='secondary' className='cursor-pointer m-auto text-uppercase text-md leading-none'>IMPORT TRANSACTIONS</Button>
        </div>
      }

    </>
  )
}
