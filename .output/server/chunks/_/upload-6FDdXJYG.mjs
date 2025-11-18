import { jsx } from 'react/jsx-runtime';
import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { T as TxnUploadPage } from './index-DK8pgixo.mjs';
import { n as createServerRpc, l as createServerFn, C as useAppSession, G as makeApiClient, H as API_URL } from './ssr.mjs';
import 'react';
import '@tanstack/react-query';
import './alert-yiaBkeOr.mjs';
import '@tanstack/form-core';
import '@tanstack/react-store';
import '@radix-ui/react-label';
import 'class-variance-authority';
import 'lucide-react';
import './card-CrVZVFlG.mjs';
import './input-Cp6Zj0xY.mjs';
import './select-SD1OuLj3.mjs';
import '@radix-ui/react-select';
import '@radix-ui/react-dialog';
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
import 'clsx';
import 'tailwind-merge';
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

const listUserCardSchema = z.object({
  success: z.boolean(),
  data: z.array(z.object({
    bank: z.string(),
    id: z.string(),
    name: z.string()
  }))
});
const listUserCardsFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_upload_tsx--listUserCardsFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return listUserCardsFn.__executeServer(opts, signal);
});
const uploadSchema = z.object({
  success: z.boolean(),
  data: z.array(z.any())
});
const uploadTxnsFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_upload_tsx--uploadTxnsFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return uploadTxnsFn.__executeServer(opts, signal);
});
const createNewCardSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.string(),
    name: z.string(),
    bank: z.string()
  })
});
const createNewCardFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_txns_upload_tsx--createNewCardFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return createNewCardFn.__executeServer(opts, signal);
});
const Route = createFileRoute("/_authenticated/txns/upload")({
  component: RouteComponent
});
const listUserCardsFn = createServerFn({
  method: "GET"
}).handler(listUserCardsFn_createServerFn_handler, async () => {
  const session = await useAppSession();
  const sessionData = session.data;
  const reqOpts = {
    method: "GET"
  };
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = "/api/statements/cards";
  const request = await client.request(url, listUserCardSchema, reqOpts)();
  const response = client.handleResponse(request);
  return response;
});
const uploadTxnsFn = createServerFn({
  method: "POST"
}).validator((input) => input).handler(uploadTxnsFn_createServerFn_handler, async ({
  data
}) => {
  if (!(data instanceof FormData)) {
    throw new Error("Invalid Form Data");
  }
  const session = await useAppSession();
  const sessionData = session.data;
  const reqOpts = {
    body: data,
    method: "POST"
  };
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = "/api/statements/upload";
  const request = await client.request(url, uploadSchema, reqOpts)();
  const response = client.handleResponse(request);
  return response;
});
const createNewCardFn = createServerFn({
  method: "POST"
}).validator((input) => input).handler(createNewCardFn_createServerFn_handler, async ({
  data
}) => {
  const session = await useAppSession();
  const sessionData = session.data;
  const reqOpts = {
    body: {
      bank: data.bank,
      card_name: data.name
    },
    method: "POST"
  };
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Authorization": `Bearer ${sessionData.token}`
      // Token passed from loader
    }
  });
  const url = "/api/statements/new-card";
  const request = await client.request(url, createNewCardSchema, reqOpts)();
  const response = client.handleResponse(request);
  return response;
});
function RouteComponent() {
  const {
    queryClient
  } = Route.useRouteContext();
  return /* @__PURE__ */ jsx(TxnUploadPage, { queryClient });
}

export { createNewCardFn_createServerFn_handler, listUserCardsFn_createServerFn_handler, uploadTxnsFn_createServerFn_handler };
//# sourceMappingURL=upload-6FDdXJYG.mjs.map
