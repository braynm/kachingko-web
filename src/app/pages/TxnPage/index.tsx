import { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Eye, EyeOff, Loader2, TableProperties, Search, ArrowDownUp, CalendarDays, RotateCcw, Upload } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Input } from '@/app/components/ui/input'
import { fetchTxnQueryOpts, TableSkeleton } from '@/app/routes/_authenticated/txns'

import { Button } from '@/app/components/ui/button'
import { EmptyData } from '@/app/components/EmptyData'

import { CardMonthTotal } from './CardMonthTotal'
import { formatAmount } from '@/lib/utils/amount'

import { endOfMonth, format, parseISO, startOfDay, startOfMonth, subMonths } from 'date-fns'
import { Link } from '@tanstack/react-router'
import { ISO8601_FORMAT } from '@/lib/utils/date'
import { ImportTransactionButton } from './ImportTransactionButton'
import { Badge } from '@/app/components/ui/badge'

const formatDate = (date: string) => format(parseISO(date), "MM/dd/yy")

const monthRange = (now = new Date()) => {
  const start = format(startOfMonth(now), ISO8601_FORMAT)
  const end = format(endOfMonth(now), ISO8601_FORMAT)

  return {
    start,
    end
  }
}

const curMonthRange = (now = new Date()) => monthRange(startOfDay(now))
const prevMonthRange = (now = new Date()) => monthRange(subMonths(startOfDay(now), 1))

export const staticBanks: Array<{ name: string, variant: string, text: string }> = [
  { name: 'RCBC Hexagon Prio', variant: 'bg-accent', text: 'text-background' },
  { name: 'RCBC Preferred AirMiles', variant: 'bg-chart-1', text: 'text-green-900' },
  { name: 'EastWest Plat Cashback', variant: 'bg-chart-3', text: 'text-accent-foreground' },
]

export function TxnPage({ queryClient }) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    data
  } = useInfiniteQuery(fetchTxnQueryOpts())

  const txns = data?.pages
    .filter(page => page.success)
    .flatMap(page => page.data.entries) ?? [];

  const resetQueries = () => {
    queryClient.resetQueries({ queryKey: ['txns'] })
    queryClient.resetQueries({ queryKey: ['txnsDailyTrend'] })
  }
  const [maskAmt, setEnableMaskAmt] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('maskAmt')
    const parsedValue = saved !== null ? JSON.parse(saved) : true

    setEnableMaskAmt(parsedValue)
    setMounted(true)
  }, [])

  // Save to localStorage whenever maskAmt changes
  useEffect(() => {
    localStorage.setItem('maskAmt', JSON.stringify(maskAmt))
  }, [maskAmt])

  const isLoading = mounted && isFetching

  return (
    <>
      <div className='container mx-auto w-full max-w-7xl w-7xl flex gap-5'>
        <Card className="min-w-[880px]">
          <CardHeader className='text-left'>
            <CardTitle>
              <div className='flex justify-between'>
                <h1 className='text-2xl font-bold'>Transactions</h1>
                <ImportTransactionButton />
              </div>
              <div className='flex justify-between mt-5'>
                <div className='flex items-center justify-center gap-2'>
                </div>
                <div className='flex items-center gap-3'>
                  <Button
                    onClick={() => setEnableMaskAmt(!maskAmt)}
                    className="cursor-pointer"
                    variant="ghost"
                    size='icon'>
                    {maskAmt ? <Eye className='cursor-pointer w-6 h-6' /> : <EyeOff className='cursor-pointerw-6 h-6' />}
                  </Button>

                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <div className='flex items-center gap-2'>
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Sort by" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Amount high to low</SelectItem>
                      <SelectItem value="apple">Amount low to high</SelectItem>
                      <SelectItem value="banana">Latest sale date</SelectItem>
                      <SelectItem value="banana">Oldest sale date</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <div className='flex items-center gap-2'>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select period" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Current Year</SelectItem>
                      <SelectItem value="banana">Previous Year</SelectItem>
                      <SelectItem value="blueberry">Current Quarter</SelectItem>
                      <SelectItem value="grapes">Previous Quarter</SelectItem>
                      <SelectItem disabled value="pineapple">Custom Date</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative border shadow rounded-md w-[150px] h-9">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-8 border-transparent border"
                    />
                  </div>
                  <Button disabled={isLoading} className='cursor-pointer shadow-lg' onClick={() => resetQueries()}>
                    <RotateCcw />
                  </Button>
                </div>
              </div>
            </CardTitle>
            <CardDescription>

            </CardDescription>
          </CardHeader>
          <CardContent>
            {isFetching && !isFetchingNextPage && <TableSkeleton length={50} />}
            {txns && txns.length > 0 && <Table>
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
            </Table>}


            {!isFetching && txns && txns.length === 0 &&
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
          </CardContent>

          <CardFooter className='m-auto'>
            {hasNextPage && <Button
              variant='outline'
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className='tex-sm transition transition-all shadow shadow-lg uppercase cursor-pointer'
            >

              {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isFetching ? 'Loading...' : 'Load more'}
            </Button>}
          </CardFooter>
        </Card>

        <div>
          <CardMonthTotal title='PREVIOUS MONTH' startDate={prevMonthRange().start} endDate={prevMonthRange().end} />
          <CardMonthTotal title='CURRENT MONTH' startDate={curMonthRange().start} endDate={curMonthRange().end} />

          {/* <CardMonthTotal title='PREVIOUS MONTH' startDate={'2025-07-01'} endDate={'2025-07-31'} /> */}
          {/* <CardMonthTotal title='CURRENT MONTH' startDate={'2025-08-01'} endDate={'2025-08-31'} /> */}
        </div>
      </div>
    </>
  );
}
