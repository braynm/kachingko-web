import { formatToHumanReadableAmount } from "@/lib/utils/amount"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/app/components/ui/chart"

type PurchaseData = {
  details: string;
  sale_date: string;
  amount: number;
};

type ChartData = {
  details: string;
  amount: number;
  fill: string;
  shortLabel: string;
};

interface CurrentMonthTopPurchaseProps {
  data?: PurchaseData[];
  isLoading: boolean
}

// Default colors for dynamic generation
const DEFAULT_COLORS = [
  "var(--chart-5)",
  "var(--chart-4)",
  "var(--chart-3)",
  "var(--chart-2)",
  "var(--chart-1)",
];

function generateShortLabel(details: string): string {
  return details.length > 10 ? details.substring(0, 10) + '...' : details;
}


function generateChartConfig(data: PurchaseData[]): ChartConfig {
  const config: ChartConfig = {
    amount: {
      label: "Amount",
    },
  };

  data.forEach((item, index) => {
    const key = `purchase_${index}`;
    config[key] = {
      label: generateShortLabel(item.details),
      color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    };
  });

  return config;
}

function transformDataForChart(data: PurchaseData[]): ChartData[] {
  return data
    .sort((a, b) => b.amount - a.amount) // Sort by amount descending
    .slice(0, 5) // Take top 5
    .map((item, index) => ({
      details: item.details,
      amount: item.amount,
      fill: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      shortLabel: generateShortLabel(item.details),
    }));
}

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-md bg-accent ${className}`} />
);

function TopPurchasesSkeleton() {
  return (
    <Card >
      <CardHeader>
        <CardTitle>Top Purchases</CardTitle>
        <CardDescription>Highest spending transactions this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4">
            <div className="flex flex-col justify-between h-64 flex-1 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="min-h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
};

function CurrentMonthTopPurchaseChart({ data = [] }: { data: PurchaseData[] }) {
  const chartData = transformDataForChart(data);
  const chartConfig = generateChartConfig(data);

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: 0,
        }}
      >
        <YAxis
          dataKey="shortLabel"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={100}
        />
        <XAxis
          dataKey="amount"
          type="number"
          hide
        />
        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload as ChartData;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="font-medium text-sm">
                      {data.details}
                    </div>
                    {/* <div className="text-xs text-muted-foreground"> */}
                    {/*   {data.details} */}
                    {/* </div> */}
                    <div className="font-bold">
                      PHP {formatToHumanReadableAmount(data.amount)}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="amount"
          layout="vertical"
          radius={5}
        />
      </BarChart>
    </ChartContainer>
  )
}

export function CurrentMonthTopPurchase({
  isLoading = false,
  data = [],
}: CurrentMonthTopPurchaseProps) {

  if (isLoading) {
    return <TopPurchasesSkeleton />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Purchases</CardTitle>
        <CardDescription>Highest spending transactions this month</CardDescription>
      </CardHeader>
      <CardContent>
        <CurrentMonthTopPurchaseChart data={data} />
      </CardContent>
    </Card>
  )
}
