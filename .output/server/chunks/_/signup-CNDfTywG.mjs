import z from 'zod';
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

z.object({
  email: z.string().email("email doesn't look right"),
  password: z.string().min(3, "password minumum of 3 character(s)"),
  confirmPassword: z.string().min(3, "password minumum of 3 character(s)")
}).refine((data) => data.password === data.confirmPassword, {
  message: "password do not match",
  path: ["confirmPassword"]
  // this makes the error show on confirmPassword
});
const signupResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    token: z.string(),
    user: z.object({
      id: z.number(),
      email: z.string().email()
    })
  })
});
const signupFn_createServerFn_handler = createServerRpc("src_app_routes_unathenticated_signup_tsx--signupFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return signupFn.__executeServer(opts, signal);
});
const signupFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(signupFn_createServerFn_handler, async ({
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
  const resp = await client.request("/api/auth/register", signupResponseSchema, reqOpts)();
  if (resp._tag === "Right") {
    const session = await useAppSession();
    await session.update(resp.right.data);
  }
  return client.handleResponse(resp);
});

export { signupFn_createServerFn_handler };
//# sourceMappingURL=signup-CNDfTywG.mjs.map
