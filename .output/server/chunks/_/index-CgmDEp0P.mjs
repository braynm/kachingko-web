import { jsx } from 'react/jsx-runtime';
import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { T as TxnPage } from './index-Cde6H0fT.mjs';
import { n as createServerRpc, l as createServerFn, C as useAppSession, G as makeApiClient, H as API_URL } from './ssr.mjs';
import 'react';
import '@tanstack/react-query';
import 'lucide-react';
import './card-CrVZVFlG.mjs';
import './select-SD1OuLj3.mjs';
import '@radix-ui/react-select';
import './input-Cp6Zj0xY.mjs';
import 'react-sparklines';
import './amount-Cl84T1iu.mjs';
import 'date-fns';
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

const txnEntry = z.object({
  id: z.string().uuid(),
  card: z.string(),
  details: z.string(),
  amount: z.string(),
  sale_date: z.string(),
  posted_date: z.string(),
  user_id: z.number()
});
const respSchema = z.object({
  success: z.boolean(),
  data: z.object({
    entries: z.array(txnEntry),
    metadata: z.object({
      limit: z.number(),
      next_cursor: z.string().nullable()
    })
  })
});
const monthlyTotalAmountSchema = z.object({
  success: z.boolean(),
  data: z.object({
    date: z.string(),
    daily_spent: z.array(z.number()),
    spent_pct: z.string()
  })
});
const fetchTxnDailyTrendFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_index_tsx--fetchTxnDailyTrendFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return fetchTxnDailyTrendFn.__executeServer(opts, signal);
});
const fetchTxnsFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_index_tsx--fetchTxnsFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return fetchTxnsFn.__executeServer(opts, signal);
});
const fetchTxnDailyTrendFn = createServerFn({
  method: "GET"
}).validator((data) => data).handler(fetchTxnDailyTrendFn_createServerFn_handler, async ({
  data: {
    startDate,
    endDate
  }
}) => {
  const session = await useAppSession();
  const sessionData = session.data;
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = `/api/statements/month-summary-spent?start_date=${startDate}&end_date=${endDate}`;
  const request = await client.request(url, monthlyTotalAmountSchema)();
  console.log("API REQUEST LOGGING TXN REQUEST: ", url);
  const response = client.handleResponse(request);
  return response;
});
const fetchTxnsFn = createServerFn({
  method: "GET"
}).validator((data) => data).handler(fetchTxnsFn_createServerFn_handler, async ({
  data: {
    page
  }
}) => {
  const session = await useAppSession();
  const sessionData = session.data;
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = !page ? "/api/statements/txns?limit=50" : `/api/statements/txns?limit=50&cursor=${page}`;
  console.log("API REQUEST LOGGING TXN REQUEST: ", url);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const request = await client.request(url, respSchema)();
  const response = client.handleResponse(request);
  return response;
});
const Route = createFileRoute("/_authenticated/txns/")({
  component: RouteComponent
});
function RouteComponent() {
  const {
    queryClient
  } = Route.useRouteContext();
  return /* @__PURE__ */ jsx(TxnPage, { queryClient });
}

export { fetchTxnDailyTrendFn_createServerFn_handler, fetchTxnsFn_createServerFn_handler };
//# sourceMappingURL=index-CgmDEp0P.mjs.map
