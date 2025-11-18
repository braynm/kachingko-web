import { z } from 'zod';
import { n as createServerRpc, l as createServerFn, G as makeApiClient, C as useAppSession, H as API_URL } from './ssr.mjs';
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

const userResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    token: z.string(),
    user: z.object({
      id: z.number(),
      email: z.string().email()
    })
  })
}).strict();
const authenticateCredentialsFn_createServerFn_handler = createServerRpc("src_lib_auth_index_ts--authenticateCredentialsFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return authenticateCredentialsFn.__executeServer(opts, signal);
});
const logout_createServerFn_handler = createServerRpc("src_lib_auth_index_ts--logout_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return logout.__executeServer(opts, signal);
});
z.object({
  email: z.string().email("email doesn't look right"),
  password: z.string().min(4)
});
const authenticateCredentialsFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(authenticateCredentialsFn_createServerFn_handler, async ({
  data
}) => {
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      "Content-Type": "application/json"
    }
  });
  const reqOpts = {
    body: data,
    method: "POST"
  };
  const resp = await client.request("/api/auth/login", userResponseSchema, reqOpts)();
  if (resp._tag === "Right") {
    const session = await useAppSession();
    await session.update(resp.right.data);
  }
  return client.handleResponse(resp);
});
const logout = createServerFn({
  method: "GET"
}).handler(logout_createServerFn_handler, async () => {
  const session = await useAppSession();
  await session.clear();
});

export { authenticateCredentialsFn_createServerFn_handler, logout_createServerFn_handler };
//# sourceMappingURL=index-DpMnxGKx.mjs.map
