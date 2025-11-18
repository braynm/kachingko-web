import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { match } from 'ts-pattern';
import { endOfYear, startOfYear, format, parseISO } from 'date-fns';
import { z as fetchUserChartsOpts, r as Skeleton$1, c as cn } from './ssr.mjs';
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, d as CardDescription } from './card-CrVZVFlG.mjs';
import { f as formatToHumanReadableAmount } from './amount-Cl84T1iu.mjs';
import * as RechartsPrimitive from 'recharts';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import * as React from 'react';
import '@tanstack/react-router';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '../nitro/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-dialog';
import '@radix-ui/react-tooltip';
import 'zod';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Applicative';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/internal';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Chain';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Compactable';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/ChainRec';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromEither';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Functor';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Separated';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Witherable';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/EitherT';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Filterable';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromIO';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromTask';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

function formatDate(date, dtFormat = "yyyy-MM-dd") {
  if (typeof date === "string") {
    return format(parseISO(date), dtFormat);
  }
  return format(date, dtFormat);
}
function getYearToDate(now = /* @__PURE__ */ new Date()) {
  return {
    startDate: formatDate(startOfYear(now)),
    endDate: formatDate(endOfYear(now))
  };
}
function CardLoading() {
  return /* @__PURE__ */ jsx(Card, { className: "my-5", children: /* @__PURE__ */ jsx(CardContent, { className: "py-4 px-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-0 min-w-0 basis-[calc(25%-0.75rem)]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-between", children: /* @__PURE__ */ jsx(Skeleton$1, { className: "h-5 w-14" }) }),
      /* @__PURE__ */ jsx(Skeleton$1, { className: "mt-1 h-8 w-22" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-0 min-w-0 basis-[calc(25%-0.75rem)]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-between", children: /* @__PURE__ */ jsx(Skeleton$1, { className: "h-5 w-14" }) }),
      /* @__PURE__ */ jsx(Skeleton$1, { className: "mt-1 h-8 w-24" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-0 min-w-0 basis-[calc(25%-0.75rem)]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-between", children: /* @__PURE__ */ jsx(Skeleton$1, { className: "ml-auto h-5 w-14" }) }),
      /* @__PURE__ */ jsx(Skeleton$1, { className: "ml-auto mt-1 h-8 w-32" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-0 min-w-0 basis-[calc(25%-0.75rem)]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx(Skeleton$1, { className: "ml-auto h-5 w-14" }) }),
      /* @__PURE__ */ jsx(Skeleton$1, { className: "h-8 mt-1 w-32 ml-auto" })
    ] })
  ] }) }) });
}
function CardTotals(props) {
  const { data, isLoading } = props;
  if (isLoading) {
    return /* @__PURE__ */ jsx(CardLoading, {});
  }
  return /* @__PURE__ */ jsx(Card, { className: "my-5", children: /* @__PURE__ */ jsx(CardContent, { className: "py-5 px-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-0 min-w-0 basis-[calc(25%-0.75rem)]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-between", children: /* @__PURE__ */ jsx("p", { className: "flex gap-1 text-xs font-medium items-center text-muted-foreground", children: "Year to Date" }) }),
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl text-left font-bold", children: [
        "PHP ",
        formatToHumanReadableAmount(parseInt(data.ytdAmount))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-0 min-w-0 basis-[calc(25%-0.75rem)]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-between", children: /* @__PURE__ */ jsx("p", { className: "flex gap-1 text-xs font-medium items-center text-muted-foreground", children: "Monthly Average" }) }),
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl text-left font-bold", children: [
        "PHP ",
        formatToHumanReadableAmount(parseInt(data.monthlyAvg))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-0 min-w-0 basis-[calc(25%-0.75rem)]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-between", children: /* @__PURE__ */ jsx("p", { className: "flex gap-1 text-xs font-medium ml-auto items-end text-muted-foreground", children: "Highest Purchase" }) }),
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl text-right font-bold", children: [
        "PHP ",
        formatToHumanReadableAmount(parseInt(data.highestPurchase))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-0 min-w-0 basis-[calc(25%-0.75rem)]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx("p", { className: " text-xs font-medium  ml-auto  text-muted-foreground", children: "Overall Spending" }) }),
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl text-right font-bold", children: [
        "PHP ",
        formatToHumanReadableAmount(parseInt(data.overallAmount))
      ] })
    ] })
  ] }) }) });
}
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            var _a;
            const color = ((_a = itemConfig.theme) == null ? void 0 : _a[theme]) || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React.useMemo(() => {
    var _a;
    if (hideLabel || !(payload == null ? void 0 : payload.length)) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey || (item == null ? void 0 : item.dataKey) || (item == null ? void 0 : item.name) || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? ((_a = config[label]) == null ? void 0 : _a.label) || label : itemConfig == null ? void 0 : itemConfig.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !(payload == null ? void 0 : payload.length)) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              ),
              children: formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
                (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: (itemConfig == null ? void 0 : itemConfig.label) || item.name })
                      ] }),
                      item.value && /* @__PURE__ */ jsx("span", { className: "text-foreground font-mono font-medium tabular-nums", children: item.value.toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            item.dataKey
          );
        }) })
      ]
    }
  );
}
const ChartLegend = RechartsPrimitive.Legend;
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}) {
  const { config } = useChart();
  if (!(payload == null ? void 0 : payload.length)) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            ),
            children: [
              (itemConfig == null ? void 0 : itemConfig.icon) && !hideIcon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: item.color
                  }
                }
              ),
              itemConfig == null ? void 0 : itemConfig.label
            ]
          },
          item.value
        );
      })
    }
  );
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
const generateChartConfig$1 = (cardNames) => {
  const colors = [
    "var(--chart-5)",
    "var(--chart-4)",
    "var(--chart-3)",
    "var(--chart-2)",
    "var(--chart-1)"
  ];
  const config = {};
  cardNames.forEach((cardName, index) => {
    config[cardName] = {
      label: cardName,
      color: colors[index % colors.length]
    };
  });
  return config;
};
const transformData = (items) => {
  const monthMap = {};
  if (!items) {
    return [];
  }
  const months = [...new Set(items.map((d) => d.month))].sort();
  const cardNames = [...new Set(items.filter((d) => d.name).map((d) => d.name))].sort();
  months.forEach((month) => {
    const monthData = { month };
    cardNames.forEach((cardName) => {
      monthData[`${cardName}_txns`] = 0;
    });
    monthMap[month] = monthData;
  });
  items.forEach((item) => {
    if (item.name && item.amount > 0) {
      monthMap[item.month][item.name] = item.amount;
      monthMap[item.month][`${item.name}_txns`] = item.total_txns;
    }
  });
  return Object.values(monthMap);
};
const customFormatter = (value, name, item, index, payload) => {
  if (!value || value === 0) return null;
  const txnKey = `${name}_txns`;
  const txnCount = payload[txnKey] || 0;
  const formattedAmount = `PHP ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const indicatorColor = item.payload.fill || item.color;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-2.5 w-2.5 shrink-0 rounded-[2px]",
        style: {
          backgroundColor: indicatorColor
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 justify-between leading-none items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: name }) }),
      /* @__PURE__ */ jsxs("span", { className: "text-foreground font-mono font-medium tabular-nums ml-1", children: [
        formattedAmount,
        " / ",
        txnCount,
        " transaction(s)"
      ] })
    ] })
  ] });
};
const formatMonth = (month) => {
  return new Date(month).toLocaleDateString("en-US", { month: "short" });
};
const formatCurrency = (value) => {
  return `${(value / 1e3).toFixed(0)}k`;
};
function ChartSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[440px] w-full p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2 mb-4", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col items-center gap-1", children: /* @__PURE__ */ jsx(Skeleton$1, { className: `w-full  min-h-[400px]` }) }, i)) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-4 mt-4", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Skeleton$1, { className: "h-3 w-3 rounded-sm" }),
      /* @__PURE__ */ jsx(Skeleton$1, { className: "h-3 w-16" })
    ] }, i)) })
  ] });
}
function CardChart({ data }) {
  const chartData = transformData(data);
  const cardNames = [...new Set(
    data.map((d) => d.name).filter((name) => name !== null)
  )].sort();
  const bars = Object.entries(generateChartConfig$1(cardNames != null ? cardNames : []));
  return /* @__PURE__ */ jsx(ChartContainer, { config: generateChartConfig$1(cardNames), className: "min-h-[200px] w-full", children: /* @__PURE__ */ jsxs(BarChart, { accessibilityLayer: true, data: chartData, children: [
    /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
    /* @__PURE__ */ jsx(
      XAxis,
      {
        dataKey: "month",
        tickLine: false,
        tickMargin: 10,
        axisLine: false,
        tickFormatter: formatMonth
      }
    ),
    /* @__PURE__ */ jsx(
      YAxis,
      {
        axisLine: { strokeWidth: 0.2 },
        tickFormatter: formatCurrency,
        className: "text-xs"
      }
    ),
    /* @__PURE__ */ jsx(
      ChartTooltip,
      {
        formatter: customFormatter,
        content: /* @__PURE__ */ jsx(ChartTooltipContent, {})
      }
    ),
    /* @__PURE__ */ jsx(ChartLegend, { content: /* @__PURE__ */ jsx(ChartLegendContent, {}) }),
    bars.map(([cardName, { color }], index) => {
      return /* @__PURE__ */ jsx(
        Bar,
        {
          dataKey: cardName,
          stackId: "spending",
          fill: `${color}`,
          name: cardName,
          radius: [0, 0, 0, 0]
        },
        cardName
      );
    })
  ] }) });
}
function MonthlyChart({ data, isLoading }) {
  return /* @__PURE__ */ jsxs(Card, { className: "mb-5", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-left", children: "Monthly Expenses" }),
      /* @__PURE__ */ jsx(CardDescription, { className: "text-left", children: "January - December 2025" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: match(isLoading).with(true, () => /* @__PURE__ */ jsx(ChartSkeleton, {})).with(false, () => /* @__PURE__ */ jsx(CardChart, { data })).otherwise(() => /* @__PURE__ */ jsx(ChartSkeleton, {})) })
  ] });
}
const DEFAULT_COLORS = [
  "var(--chart-5)",
  "var(--chart-4)",
  "var(--chart-3)",
  "var(--chart-2)",
  "var(--chart-1)"
];
function generateShortLabel(details) {
  return details.length > 10 ? details.substring(0, 10) + "..." : details;
}
function generateChartConfig(data) {
  const config = {
    amount: {
      label: "Amount"
    }
  };
  data.forEach((item, index) => {
    const key = `purchase_${index}`;
    config[key] = {
      label: generateShortLabel(item.details),
      color: DEFAULT_COLORS[index % DEFAULT_COLORS.length]
    };
  });
  return config;
}
function transformDataForChart(data) {
  return data.sort((a, b) => b.amount - a.amount).slice(0, 5).map((item, index) => ({
    details: item.details,
    amount: item.amount,
    fill: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    shortLabel: generateShortLabel(item.details)
  }));
}
const Skeleton = ({ className = "" }) => /* @__PURE__ */ jsx("div", { className: `animate-pulse rounded-md bg-accent ${className}` });
function TopPurchasesSkeleton() {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Top Purchases" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Highest spending transactions this month" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 p-4", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-between h-64 flex-1 gap-4", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "min-h-10 w-full" }, i)) }) }) }) })
  ] });
}
function CurrentMonthTopPurchaseChart({ data = [] }) {
  const chartData = transformDataForChart(data);
  const chartConfig = generateChartConfig(data);
  return /* @__PURE__ */ jsx(ChartContainer, { config: chartConfig, children: /* @__PURE__ */ jsxs(
    BarChart,
    {
      accessibilityLayer: true,
      data: chartData,
      layout: "vertical",
      margin: {
        left: 0
      },
      children: [
        /* @__PURE__ */ jsx(
          YAxis,
          {
            dataKey: "shortLabel",
            type: "category",
            tickLine: false,
            tickMargin: 10,
            axisLine: false,
            width: 100
          }
        ),
        /* @__PURE__ */ jsx(
          XAxis,
          {
            dataKey: "amount",
            type: "number",
            hide: true
          }
        ),
        /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            cursor: false,
            content: ({ active, payload }) => {
              if (active && payload && payload.length) {
                const data2 = payload[0].payload;
                return /* @__PURE__ */ jsx("div", { className: "rounded-lg border bg-background p-2 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium text-sm", children: data2.details }),
                  /* @__PURE__ */ jsxs("div", { className: "font-bold", children: [
                    "PHP ",
                    formatToHumanReadableAmount(data2.amount)
                  ] })
                ] }) });
              }
              return null;
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Bar,
          {
            dataKey: "amount",
            layout: "vertical",
            radius: 5
          }
        )
      ]
    }
  ) });
}
function CurrentMonthTopPurchase({
  isLoading = false,
  data = []
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsx(TopPurchasesSkeleton, {});
  }
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Top Purchases" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Highest spending transactions this month" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(CurrentMonthTopPurchaseChart, { data }) })
  ] });
}
const defaultValues = {
  highestPurchase: "0",
  monthlyAvg: "0",
  overallAmount: "0",
  ytdAmount: "0"
};
function SpendingHighlightPage() {
  const queryClient = useQueryClient();
  const { startDate, endDate } = getYearToDate();
  const { isFetching, ...query } = useQuery(fetchUserChartsOpts(startDate, endDate));
  const monthlyExpenses = query.data && query.data.success ? query.data.data.monthly_expenses : [];
  const topExpenses = query.data && query.data.success ? query.data.data.top_expenses : [];
  const totals = match(query.data).with({ success: false }, () => ({ ...defaultValues })).with({ success: true }, (data) => ({
    highestPurchase: data.data.highest_purchase,
    monthlyAvg: data.data.monthly_avg,
    overallAmount: data.data.overall_amount,
    ytdAmount: data.data.ytd_amount
  })).otherwise(() => ({ ...defaultValues }));
  return /* @__PURE__ */ jsxs("div", { className: "min-w-5xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-left text-2xl font-bold ", children: "Spending Highlights" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center justify-center", children: [
        /* @__PURE__ */ jsx(SlidersHorizontal, { className: "cursor-pointer h-5 w-5" }),
        /* @__PURE__ */ jsx(RotateCcw, { onClick: () => {
          queryClient.invalidateQueries({
            queryKey: ["fetchUserChartsOpts", startDate, endDate]
          });
        }, className: "cursor-pointer h-5 w-5" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardTotals, { data: totals, isLoading: isFetching }),
    /* @__PURE__ */ jsx(MonthlyChart, { isLoading: isFetching, data: monthlyExpenses }),
    /* @__PURE__ */ jsx(CurrentMonthTopPurchase, { isLoading: isFetching, data: topExpenses })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsx(SpendingHighlightPage, {});
}

export { RouteComponent as component };
//# sourceMappingURL=index-C7qaomgn.mjs.map
