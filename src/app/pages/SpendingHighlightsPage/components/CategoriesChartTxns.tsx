import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/app/components/ui/chart"
import { CategoriesTxnList } from "./CategoriesTxnList";
import { fetchCategoryChartAndTxnsOpts } from "@/app/routes/_authenticated/spending-highlights";
import { useQuery } from "@tanstack/react-query";
import { match } from "ts-pattern";

// Pre-defined 100 green shades from darkest to lightest
const greenShades100 = [
  "hsl(142, 68.9%, 23.6%)",
  "hsl(142, 71%, 24.5%)",
  "hsl(142, 73.1%, 25.5%)",
  "hsl(142, 75.3%, 26.4%)",
  "hsl(142, 77.4%, 27.3%)",
  "hsl(142, 79.3%, 28.2%)",
  "hsl(142, 80.9%, 29.1%)",
  "hsl(142, 82.2%, 30%)",
  "hsl(142, 83.1%, 30.9%)",
  "hsl(142, 83.6%, 31.8%)",
  "hsl(142, 83.6%, 32.7%)",
  "hsl(142, 83.2%, 33.6%)",
  "hsl(142, 82.4%, 34.5%)",
  "hsl(142, 81.3%, 35.5%)",
  "hsl(142, 79.8%, 36.4%)",
  "hsl(142, 78.1%, 37.3%)",
  "hsl(142, 76.3%, 38.2%)",
  "hsl(142, 74.4%, 39.1%)",
  "hsl(142, 72.5%, 40%)",
  "hsl(142, 70.8%, 40.9%)",
  "hsl(142, 69.3%, 41.8%)",
  "hsl(142, 68.1%, 42.7%)",
  "hsl(142, 67.3%, 43.6%)",
  "hsl(142, 66.9%, 44.5%)",
  "hsl(142, 67%, 45.5%)",
  "hsl(142, 67.5%, 46.4%)",
  "hsl(142, 68.5%, 47.3%)",
  "hsl(142, 69.9%, 48.2%)",
  "hsl(142, 71.6%, 49.1%)",
  "hsl(142, 73.5%, 50%)",
  "hsl(142, 75.6%, 50.9%)",
  "hsl(142, 77.7%, 51.8%)",
  "hsl(142, 79.8%, 52.7%)",
  "hsl(142, 81.7%, 53.6%)",
  "hsl(142, 83.3%, 54.5%)",
  "hsl(142, 84.6%, 55.5%)",
  "hsl(142, 85.5%, 56.4%)",
  "hsl(142, 86%, 57.3%)",
  "hsl(142, 86.1%, 58.2%)",
  "hsl(142, 85.7%, 59.1%)",
  "hsl(142, 84.9%, 60%)",
  "hsl(142, 83.8%, 60.9%)",
  "hsl(142, 82.3%, 61.8%)",
  "hsl(142, 80.6%, 62.7%)",
  "hsl(142, 78.7%, 63.6%)",
  "hsl(142, 76.7%, 64.5%)",
  "hsl(142, 74.7%, 65.5%)",
  "hsl(142, 72.8%, 66.4%)",
  "hsl(142, 71.1%, 67.3%)",
  "hsl(142, 69.6%, 68.2%)",
  "hsl(142, 68.4%, 69.1%)",
  "hsl(142, 67.6%, 70%)",
  "hsl(142, 67.2%, 70.9%)",
  "hsl(142, 67.2%, 71.8%)",
  "hsl(142, 67.7%, 72.7%)",
  "hsl(142, 68.6%, 73.6%)",
  "hsl(142, 70%, 74.5%)",
  "hsl(142, 71.7%, 75.5%)",
  "hsl(142, 73.6%, 76.4%)",
  "hsl(142, 75.7%, 77.3%)",
  "hsl(142, 77.9%, 78.2%)",
  "hsl(142, 80.1%, 79.1%)",
  "hsl(142, 82.1%, 80%)",
  "hsl(142, 83.9%, 80.9%)",
  "hsl(142, 85.4%, 81.8%)",
  "hsl(142, 86.6%, 82.7%)",
  "hsl(142, 87.3%, 83.6%)",
  "hsl(142, 87.6%, 84.5%)",
  "hsl(142, 87.5%, 85.5%)",
  "hsl(142, 87%, 86.4%)",
  "hsl(142, 86.1%, 87.3%)",
  "hsl(142, 84.8%, 88.2%)",
  "hsl(142, 83.2%, 89.1%)",
  "hsl(142, 81.4%, 90%)",
  "hsl(142, 79.5%, 90.9%)",
  "hsl(142, 77.5%, 91.8%)",
  "hsl(142, 75.6%, 92.7%)",
  "hsl(142, 73.8%, 93.6%)",
  "hsl(142, 72.2%, 94.5%)",
  "hsl(142, 70.8%, 95.5%)",
  "hsl(142, 69.7%, 96.4%)",
  "hsl(142, 69%, 97.3%)",
  "hsl(142, 68.7%, 98.2%)",
  "hsl(142, 68.8%, 99.1%)",
  "hsl(142, 69.3%, 100%)"
];

// Function to get appropriate shades based on data count
const getShades = (count: number): string[] => {
  if (count <= 5) {
    // Use every 20th shade for maximum contrast
    const step = 10;
    return Array.from({ length: count }, (_, i) => greenShades100[i * step]);
  } else if (count <= 10) {
    // Use every 10th shade for good contrast
    const step = 5;
    return Array.from({ length: count }, (_, i) => greenShades100[i * step]);
  } else if (count <= 20) {
    // Use every 5th shade
    const step = 3;
    return Array.from({ length: count }, (_, i) => greenShades100[Math.min(i * step, 99)]);
  } else if (count <= 50) {
    // Use every 2nd shade
    const step = 2;
    return Array.from({ length: count }, (_, i) => greenShades100[Math.min(i * step, 99)]);
  } else {
    // Use consecutive shades for large datasets
    return greenShades100.slice(0, count);
  }
};

// Your data - can be dynamic
const rawChartData = [
  { category: "chrome", label: "Chrome", value: 275 },
  { category: "safari", label: "Safari", value: 200 },
  { category: "firefox", label: "Firefox", value: 187 },
  { category: "edge", label: "Edge", value: 173 },
  { category: "other", label: "Other", value: 90 },
];

// Get shades for the number of data items

type PieChartConfig = () => ChartConfig

// Build dynamic chart config
const chartConfig: PieChartConfig = (data, shades) => {
  return {
    value: {
      label: "Visitors",
    },
    ...data.reduce((acc, item, index) => {
      acc[item.category] = {
        label: item.label,
        color: shades[index],
      };
      return acc;
    }, {} as ChartConfig)
  }
};

export const description = "A pie chart with dynamic green shades"
export function CategoriesChartTxns() {
  // const { isFetching, ...query } = useQuery(fetchCategoryChartAndTxnsOpts("2025-09-01", "2025-09-30"))
  const { isFetching, ...query } = useQuery(fetchCategoryChartAndTxnsOpts("2025-05-01", "2025-05-31"))
  const shades = getShades(query.data?.success ? query.data.data.categories.length : 0);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Your September Purchases</CardTitle>
        <CardDescription>Categories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {!isFetching && query.data?.success &&
          <ChartContainer config={chartConfig(query.data?.data?.categories, shades)} className="mb-10">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Pie
                data={query.data.data.categories.map((item, index) => ({ ...item, fill: shades[index] }))}
                dataKey="value"
                nameKey="category"
                fill="#8884d8"
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="category" />}
                className="flex-wrap *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        }

        <CategoriesTxnList
          isFetching={isFetching}
          curMonthTotalAmount={query.data?.success ? query.data?.data.cur_month_total_amount : '0'}
          txns={query.data?.success ? query.data?.data.cur_month_txns : []}
        />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card >
  )
}
