import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart"
import { Skeleton } from "@/app/components/ui/skeleton"
import { match, P } from "ts-pattern"

const THEMES = { light: "", dark: ".dark" } as const

type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

const generateChartConfig = (cardNames: Array<string>): ChartConfig => {
  const colors = [
    "var(--chart-5)",
    "var(--chart-4)",
    "var(--chart-3)",
    "var(--chart-2)",
    "var(--chart-1)",
  ];

  const config = {};
  cardNames.forEach((cardName, index) => {
    config[cardName] = {
      label: cardName,
      color: colors[index % colors.length]
    };
  });

  return config;
}

const transformData = (items: BarchartItem[]) => {
  const monthMap = {};

  // Initialize all months
  if (!items) {
    return []
  }
  const months = [...new Set(items.map(d => d.month))].sort();
  const cardNames = [...new Set(items.filter(d => d.name).map(d => d.name))].sort()
  months.forEach(month => {
    const monthData = { month };
    // Dynamically create keys for each card name
    cardNames.forEach(cardName => {
      // monthData[cardName] = 0;
      monthData[`${cardName}_txns`] = 0;
    });
    monthMap[month] = monthData;
  });

  items.forEach(item => {
    if (item.name && item.amount > 0) {
      monthMap[item.month][item.name] = item.amount;
      monthMap[item.month][`${item.name}_txns`] = item.total_txns;
    }
  });

  return Object.values(monthMap);

}

const customFormatter = (value: number, name: string, item, index, payload) => {
  if (!value || value === 0) return null;

  const txnKey = `${name}_txns`;
  const txnCount = payload[txnKey] || 0;

  const formattedAmount = `PHP ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const indicatorColor = item.payload.fill || item.color;

  return (
    <>
      <div
        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
        style={{
          backgroundColor: indicatorColor,
        }}
      />
      <div className="flex flex-1 justify-between leading-none items-center">
        <div className="grid gap-1.5">
          <span className="text-muted-foreground">
            {name}
          </span>
        </div>
        <span className="text-foreground font-mono font-medium tabular-nums ml-1">
          {formattedAmount} / {txnCount} transaction(s)
        </span>
      </div>
    </>
  );
};

const formatMonth = (month: string) => {
  return new Date(month).toLocaleDateString('en-US', { month: 'short' });
};

const formatCurrency = (value: number) => {
  // return formatAmount(value)
  return `${(value / 1000).toFixed(0)}k`;
};

function ChartSkeleton() {
  return (
    <div className="min-h-[440px] w-full p-4">
      {/* Y-axis skeleton */}
      <div className="flex">

        {/* Chart area skeleton */}
        <div className="flex-1">
          {/* Bars skeleton */}
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <Skeleton className={`w-full  min-h-[400px]`} />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Legend skeleton */}
      <div className="flex justify-center gap-4 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}

type BarRadius = [number, number, number, number]
type BarchartItem = {
  month: string
  name: string | null
  amount: number
  total_txns: number
}

function CardChart({ data }: { data: BarchartItem[] }) {
  const chartData = transformData(data)
  const cardNames = [...new Set(
    data
      .map(d => d.name)
      .filter(name => name !== null)
  )].sort()

  const bars = Object.entries(generateChartConfig(cardNames ?? []))

  return (
    <ChartContainer config={generateChartConfig(cardNames)} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={formatMonth}
        />
        <YAxis
          axisLine={{ strokeWidth: 0.2 }}
          tickFormatter={formatCurrency}
          className="text-xs"
        />
        <ChartTooltip
          formatter={customFormatter}
          content={<ChartTooltipContent />}
        />
        <ChartLegend content={<ChartLegendContent />} />


        {bars.map(([cardName, { color }], index) => {
          // const radius = match([index, bars.length])
          //   .with([0, 1], () => [4, 4, 0, 0] as BarRadius)
          //   .with([0, P._], () => [0, 0, 0, 0] as BarRadius)
          //   .otherwise(() => [4, 4, 0, 0] as BarRadius)

          return <Bar
            key={cardName}
            dataKey={cardName}
            stackId='spending'
            fill={`${color}`}
            name={cardName}
            radius={[0, 0, 0, 0]}
          />
        })}
      </BarChart>
    </ChartContainer>
  )
}


export function MonthlyChart({ data, isLoading }: { data: BarchartItem[], isLoading: boolean }) {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="text-left">Monthly Expenses</CardTitle>
        <CardDescription className="text-left">January - December 2025</CardDescription>
      </CardHeader>
      <CardContent>
        {match(isLoading)
          .with(true, () => <ChartSkeleton />)
          .with(false, () => <CardChart data={data} />)
          .otherwise(() => <ChartSkeleton />)
        }
      </CardContent>
    </Card>)
}
