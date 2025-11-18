import z from 'zod';
import { n as createServerRpc, l as createServerFn, C as useAppSession, G as makeApiClient, H as API_URL } from './ssr.mjs';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import '@tanstack/react-query';
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
import 'react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-dialog';
import 'lucide-react';
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

const logoutSchema = z.object({
  success: z.boolean(),
  data: z.string()
});
const logoutFn_createServerFn_handler = createServerRpc("src_app_routes_authenticated_logout_tsx--logoutFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return logoutFn.__executeServer(opts, signal);
});
const logoutFn = createServerFn({
  method: "GET"
}).handler(logoutFn_createServerFn_handler, async () => {
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
  const url = `/api/auth/logout`;
  const request = await client.request(url, logoutSchema)();
  console.log("API REQUEST LOGOUT: ", url);
  const response = client.handleResponse(request);
  return response;
});

export { logoutFn_createServerFn_handler };
//# sourceMappingURL=logout-1gEI1dGY.mjs.map
