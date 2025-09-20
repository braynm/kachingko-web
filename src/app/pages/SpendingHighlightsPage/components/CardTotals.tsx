import {
  Card,
  CardContent,
} from "@/app/components/ui/card"
import { Skeleton } from "@/app/components/ui/skeleton"
import { formatToHumanReadableAmount } from "@/lib/utils/amount"


type CardTotalsProps = {
  highestPurchase: string,
  monthlyAvg: string,
  overallAmount: string,
  ytdAmount: string,
}

function CardLoading() {
  return (
    <Card className="my-5">
      <CardContent className="py-4 px-10">
        <div className="flex flex-wrap gap-4">
          <div className="flex-0 min-w-0 basis-[calc(25%-0.75rem)]">
            <div className="flex items-between">
              <Skeleton className="h-5 w-14" />
            </div>
            <Skeleton className="mt-1 h-8 w-22" />
          </div>

          <div className="flex-0 min-w-0 basis-[calc(25%-0.75rem)]">
            <div className="flex items-between">
              <Skeleton className="h-5 w-14" />
            </div>
            <Skeleton className="mt-1 h-8 w-24" />
          </div>

          <div className="flex-0 min-w-0 basis-[calc(25%-0.75rem)]">
            <div className="flex items-between">
              <Skeleton className="ml-auto h-5 w-14" />
            </div>
            <Skeleton className="ml-auto mt-1 h-8 w-32" />
          </div>

          <div className="flex-0 min-w-0 basis-[calc(25%-0.75rem)]">
            <div className="flex items-end">
              <Skeleton className="ml-auto h-5 w-14" />
            </div>
            <Skeleton className="h-8 mt-1 w-32 ml-auto" />
          </div>
        </div>
      </CardContent>
    </Card>)
}

export function CardTotals(props: { data: CardTotalsProps, isLoading: boolean }) {
  const { data, isLoading } = props

  if (isLoading) {
    return <CardLoading />
  }

  return (
    <Card className="my-5">
      <CardContent className="py-5 px-10">
        <div className="flex flex-wrap gap-4">
          <div className="flex-0 min-w-0 basis-[calc(25%-0.75rem)]">
            <div className="flex items-between">
              <p className="flex gap-1 text-xs font-medium items-center text-muted-foreground">Year to Date</p>
            </div>
            <h2 className="text-2xl text-left font-bold">PHP {formatToHumanReadableAmount(parseInt(data.ytdAmount))}</h2>
          </div>

          <div className="flex-0 min-w-0 basis-[calc(25%-0.75rem)]">
            <div className="flex items-between">
              <p className="flex gap-1 text-xs font-medium items-center text-muted-foreground">Monthly Average</p>
            </div>
            <h2 className="text-2xl text-left font-bold">PHP {formatToHumanReadableAmount(parseInt(data.monthlyAvg))}</h2>
          </div>

          <div className="flex-0 min-w-0 basis-[calc(25%-0.75rem)]">
            <div className="flex items-between">
              <p className="flex gap-1 text-xs font-medium ml-auto items-end text-muted-foreground">Highest Purchase</p>
            </div>
            <h2 className="text-2xl text-right font-bold">PHP {formatToHumanReadableAmount(parseInt(data.highestPurchase))}</h2>
          </div>

          <div className="flex-0 min-w-0 basis-[calc(25%-0.75rem)]">
            <div className="flex items-end">
              <p className=" text-xs font-medium  ml-auto  text-muted-foreground">Overall Spending</p>
            </div>
            <h2 className="text-2xl text-right font-bold">PHP {formatToHumanReadableAmount(parseInt(data.overallAmount))}</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  )

}
