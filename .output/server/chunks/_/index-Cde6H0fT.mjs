import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useInfiniteQuery, useQuery, queryOptions } from '@tanstack/react-query';
import { Upload, Eye, EyeOff, ArrowDownUp, CalendarDays, Search, RotateCcw, TableProperties, Loader2, BanknoteX, ArrowUpRight, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import { J as fetchTxnQueryOpts, B as Button, K as TableSkeleton, t as Table, v as TableHeader, T as TableRow, w as TableHead, x as TableBody, q as TableCell, I as fetchTxnDailyTrendFn, r as Skeleton } from './ssr.mjs';
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent, e as CardFooter } from './card-CrVZVFlG.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-SD1OuLj3.mjs';
import { I as Input } from './input-Cp6Zj0xY.mjs';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { a as formatAmount } from './amount-Cl84T1iu.mjs';
import { format, parseISO } from 'date-fns';
import { Link } from '@tanstack/react-router';

function EmptyData(props) {
  const { title, description, actionButton, emptyIcon: EmptyIcon } = props;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-full bg-muted p-6", children: [
      EmptyIcon && /* @__PURE__ */ jsx(EmptyIcon, { className: "h-16 w-16 text-muted-foreground" }),
      !EmptyIcon && /* @__PURE__ */ jsx(BanknoteX, { className: "h-16 w-16 text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xl font-semibold text-foreground", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "mb-6 w-sm text-sm text-muted-foreground leading-relaxed", children: description }),
    actionButton && /* @__PURE__ */ jsx("div", { className: "mt-2", children: actionButton })
  ] });
}
const formatDate$1 = (date) => format(parseISO(date), "MMM yyyy");
const fetchTxnDailyTrendQueryOpts = (startDate, endDate) => queryOptions({
  queryKey: ["txnsDailyTrend", startDate, endDate],
  queryFn: () => fetchTxnDailyTrendFn({ data: { startDate, endDate } })
});
function CardMonthTotalSkeletonLoading() {
  return /* @__PURE__ */ jsx(Card, { className: "border mb-5 min-h-[255px] min-w-[263px]", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-24 mb-3" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-8" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-28" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-28" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12" })
    ] })
  ] }) }) });
}
function CardEmptyData({ date }) {
  return /* @__PURE__ */ jsx(Card, { className: "border mb-5 min-w-[263px] max-w-[263px]", children: /* @__PURE__ */ jsx(CardContent, { className: "text-left gap-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx("p", { className: "flex gap-1 text-xs font-medium items-center text-muted-foreground mb-5", children: date }),
    /* @__PURE__ */ jsx(EmptyData, { emptyIcon: BanknoteX, title: "No Transactions" })
  ] }) }) });
}
function CardMonthTotal(props) {
  var _a;
  const reqQuery = useQuery(fetchTxnDailyTrendQueryOpts(props.startDate, props.endDate));
  const { startDate, title } = props;
  const { data } = reqQuery;
  if (reqQuery.isLoading) {
    return /* @__PURE__ */ jsx(CardMonthTotalSkeletonLoading, {});
  }
  if (!(data == null ? void 0 : data.success) || (data == null ? void 0 : data.success) && ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.daily_spent.length) === 0) {
    return /* @__PURE__ */ jsx(CardEmptyData, { date: startDate });
  }
  const pct = (percentage) => {
    if (percentage === "-") {
      return /* @__PURE__ */ jsx(Minus, { className: "h4 w-4" });
    }
    if (parseInt(percentage) > 0) {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4" }),
        spent_pct,
        "%"
      ] });
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(TrendingDown, { className: "h-4 w-4" }),
      spent_pct,
      "%"
    ] });
  };
  const { data: { spent_pct, daily_spent } } = data;
  return /* @__PURE__ */ jsxs(Card, { className: "border mb-5 min-w-[263px] max-w-[263px]", children: [
    /* @__PURE__ */ jsxs(CardContent, { className: "text-left gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-between mb-5", children: [
        /* @__PURE__ */ jsx("p", { className: "flex gap-1 text-xs font-medium items-center text-muted-foreground", children: formatDate$1(startDate) }),
        /* @__PURE__ */ jsx("p", { className: "flex ml-auto gap-1 text-xs font-medium items-center text-muted-foreground", children: pct(spent_pct) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase text-muted-foreground font-semibold tracking-tight", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold mb-5", children: formatAmount(daily_spent.reduce((amt, acc) => acc + amt)) }),
      /* @__PURE__ */ jsx(Sparklines, { data: daily_spent, limit: 31, margin: 0, children: /* @__PURE__ */ jsx(SparklinesLine, { color: "#b8bb26" }) })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs("p", { className: "flex text-sm text-muted-foreground items-center", children: [
      "View Insights ",
      /* @__PURE__ */ jsx(ArrowUpRight, { className: "font-muted h-4 w-4" })
    ] }) })
  ] });
}
const formatDate = (date) => format(parseISO(date), "MM/dd/yy");
function TxnPage({ queryClient }) {
  var _a;
  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    data
  } = useInfiniteQuery(fetchTxnQueryOpts());
  const txns = (_a = data == null ? void 0 : data.pages.filter((page) => page.success).flatMap((page) => page.data.entries)) != null ? _a : [];
  const resetQueries = () => {
    queryClient.resetQueries({ queryKey: ["txns"] });
    queryClient.resetQueries({ queryKey: ["txnsDailyTrend"] });
  };
  const [maskAmt, setEnableMaskAmt] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("maskAmt");
    const parsedValue = saved !== null ? JSON.parse(saved) : true;
    setEnableMaskAmt(parsedValue);
    setMounted(true);
  }, []);
  useEffect(() => {
    localStorage.setItem("maskAmt", JSON.stringify(maskAmt));
  }, [maskAmt]);
  const isLoading = mounted && isFetching;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto w-full max-w-7xl w-7xl flex gap-5", children: [
    /* @__PURE__ */ jsxs(Card, { className: "min-w-[880px]", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsxs(CardTitle, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Transactions" }),
            /* @__PURE__ */ jsx(Link, { title: "Upload", to: "/txns/upload", className: "p-3 bg-secondary rounded-md transition text-secondary-foreground", children: /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-5", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => setEnableMaskAmt(!maskAmt),
                  className: "cursor-pointer",
                  variant: "ghost",
                  size: "icon",
                  children: maskAmt ? /* @__PURE__ */ jsx(Eye, { className: "cursor-pointer w-6 h-6" }) : /* @__PURE__ */ jsx(EyeOff, { className: "cursor-pointerw-6 h-6" })
                }
              ),
              /* @__PURE__ */ jsxs(Select, { children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(ArrowDownUp, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsx(SelectValue, { placeholder: "Sort by" })
                ] }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "apple", children: "Amount high to low" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "apple", children: "Amount low to high" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "banana", children: "Latest sale date" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "banana", children: "Oldest sale date" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(Select, { children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select period" })
                ] }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "apple", children: "Current Year" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "banana", children: "Previous Year" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "blueberry", children: "Current Quarter" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "grapes", children: "Previous Quarter" }),
                  /* @__PURE__ */ jsx(SelectItem, { disabled: true, value: "pineapple", children: "Custom Date" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative border shadow rounded-md w-[150px] h-9", children: [
                /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "search",
                    placeholder: "Search...",
                    className: "pl-8 border-transparent border"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "secondary", disabled: isLoading, className: "cursor-pointer shadow-lg", onClick: () => resetQueries(), children: /* @__PURE__ */ jsx(RotateCcw, {}) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(CardDescription, {})
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        isFetching && !isFetchingNextPage && /* @__PURE__ */ jsx(TableSkeleton, { length: 50 }),
        txns && txns.length > 0 && /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { className: "text-left bold", children: "Card" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-left bold", children: "Sale Date" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-left bold", children: "Post Date" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-left bold", children: "Description" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-right bold", children: "Amount" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: txns.map((transaction) => /* @__PURE__ */ jsxs(TableRow, { className: "p-5 odd:bg-muted/50", children: [
            /* @__PURE__ */ jsx(TableCell, { className: "text-left text-xs", children: transaction.card }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-left text-xs", children: formatDate(transaction.sale_date) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-left text-xs", children: formatDate(transaction.posted_date) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-left text-xs", children: transaction.details }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right font-medium ", children: maskAmt ? formatAmount(transaction.amount).replace(/\d/g, "X") : formatAmount(transaction.amount) })
          ] }, `${transaction.id} ${transaction.amount}`)) })
        ] }),
        !isFetching && txns && txns.length === 0 && /* @__PURE__ */ jsxs("div", { className: "mt-[5rem] flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(EmptyData, { title: "Empty Transactions", emptyIcon: TableProperties }),
          /* @__PURE__ */ jsx(Button, { onClick: () => resetQueries(), variant: "outline", className: "border cursor-pointer m-auto", children: "Refresh" }),
          /* @__PURE__ */ jsx("div", { className: "w-[10rem] m-auto relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t", children: /* @__PURE__ */ jsx("span", { className: "bg-card text-muted-foreground relative z-10 px-2", children: "or" }) }),
          /* @__PURE__ */ jsx(Button, { variant: "secondary", className: "cursor-pointer m-auto text-uppercase text-md leading-none", children: "IMPORT TRANSACTIONS" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(CardFooter, { className: "m-auto", children: hasNextPage && /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "secondary",
          onClick: () => fetchNextPage(),
          disabled: !hasNextPage || isFetchingNextPage,
          className: "transition transition-all shadow shadow-lg uppercase cursor-pointer bg-secondary text-secondary-foreground",
          children: [
            isFetching && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            isFetching ? "Loading..." : "Load more"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(CardMonthTotal, { title: "PREVIOUS MONTH", startDate: "2025-07-01", endDate: "2025-07-31" }),
      /* @__PURE__ */ jsx(CardMonthTotal, { title: "CURRENT MONTH", startDate: "2025-08-01", endDate: "2025-08-31" })
    ] })
  ] }) });
}

export { TxnPage as T };
//# sourceMappingURL=index-Cde6H0fT.mjs.map
