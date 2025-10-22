import { useState } from "react";
import { Eye, EyeOff, TableProperties, TrendingDown, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'

import { bankCardColors, mergeBankAndColors } from "../../TxnPage";
import { formatDate } from "@/lib/utils/date";
import { formatAmount } from "@/lib/utils/amount";
import { EmptyData } from "@/app/components/EmptyData";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { TableSkeleton } from "@/app/routes/_authenticated/txns";
import { listUserCardsOptions } from "../../TxnUploadPage";
import { CategoryBadge } from "@/app/components/CategoryBadge";

type TxnItem = {
  category: string,
  details: string,
  sale_date: string,
  posted_date: string,
  id: string,
  card: string,
  amount: number,
}
type CategoriesTxnListProps = {
  isFetching: boolean,
  curMonthTotalAmount: string,
  prevMonthTotalAmount: string,
  txns: Array<TxnItem>
}


export function CategoriesTxnList({
  txns, isFetching, curMonthTotalAmount, prevMonthTotalAmount
}: CategoriesTxnListProps) {
  const { data: cardsResponse } = useQuery(listUserCardsOptions)
  const cards = cardsResponse?.success ? mergeBankAndColors(cardsResponse.data, bankCardColors) : []

  const [maskAmt, setMaskAmt] = useState(true)
  const pct = Math.abs(Number(curMonthTotalAmount) - Number(prevMonthTotalAmount)) / Number(prevMonthTotalAmount) * 100

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-2">
          <div className="flex items-center">
            <h2 className="text-sm text-muted-foreground">Transactions</h2>
            <div className="flex gap-2 items-center">
              {txns && txns.length > 0 && <Button
                onClick={() => setMaskAmt(!maskAmt)}
                className="cursor-pointer"
                variant="ghost"
                size='icon'>
                {maskAmt ? <Eye className='cursor-pointer w-6 h-6' /> : <EyeOff className='cursor-pointerw-6 h-6' />}
              </Button>}
            </div>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-muted-foreground">PHP</span>
              <h2 className="text-2xl font-bold ">{formatAmount(curMonthTotalAmount)}</h2>
            </div>
            {!isFetching && ![Infinity, NaN].includes(pct) && <span className="text-sm flex items-center gap-1 text-muted-foreground">
              {Number(curMonthTotalAmount) >= Number(prevMonthTotalAmount) ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Number(curMonthTotalAmount) >= Number(prevMonthTotalAmount) ? '+' : '-'}
              {Math.round(pct)}%
            </span>}
          </div>
        </div>
      </div >
      {isFetching && <TableSkeleton length={10} />
      }
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
            {txns.map((transaction) => {
              const card = cards.find(card => `${card.bank} ${card.name}` === transaction.card)
              return (
                <TableRow key={`${transaction.id} ${transaction.amount}`} className="p-5 odd:bg-muted/50">
                  <TableCell className="text-left text-xs">
                    <Badge className={`${card?.variant} ${card?.text}`}>
                      {transaction.card}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left text-xs">
                    <CategoryBadge text={transaction.category} />
                  </TableCell>
                  <TableCell className="text-left text-xs">{formatDate(transaction.sale_date)}</TableCell>
                  <TableCell className="text-left text-xs">{formatDate(transaction.posted_date)}</TableCell>
                  <TableCell className="text-left text-xs">{transaction.details}</TableCell>
                  <TableCell className="text-right font-medium ">{
                    maskAmt ? formatAmount(transaction.amount).replace(/\d/g, 'X') : formatAmount(transaction.amount)
                  }</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      }


      {
        !isFetching && txns && txns.length === 0 &&
        <div className='mt-[5rem] flex flex-col gap-3'>
          <EmptyData title="Empty Transactions" emptyIcon={TableProperties} />

          {/* <Button onClick={() => resetQueries()} variant='outline' className='border cursor-pointer m-auto'>Refresh</Button> */}
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
