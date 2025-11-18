import { jsx, jsxs } from 'react/jsx-runtime';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet, HeadContent, Scripts } from '@tanstack/react-router';
import { n as createServerRpc, l as createServerFn, C as useAppSession, D as appCss, E as ThemeProvider, F as SidebarProvider } from './ssr.mjs';
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

const getSession_createServerFn_handler = createServerRpc("src_app_routes_root_tsx--getSession_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getSession.__executeServer(opts, signal);
});
const getSession = createServerFn({
  method: "GET"
}).handler(getSession_createServerFn_handler, async () => {
  const session = await useAppSession();
  if (!session.data.token) {
    return null;
  }
  return session.data;
});
function RootComponent() {
  const {
    queryClient
  } = Route.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(ThemeProvider, { storageKey: "vite-ui-theme", children: /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(SidebarProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) }) }) });
}
const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      title: "KachingKo \u2014 Track & Understand Your Credit Card Spending"
    }],
    links: [{
      rel: "stylesheet",
      href: appCss
    }]
  }),
  beforeLoad: async () => {
    const session = await getSession();
    return {
      session
    };
  },
  notFoundComponent: () => /* @__PURE__ */ jsx("div", { children: "404 Not Found" }),
  context: () => {
    return {
      queryClient: new QueryClient({
        queryCache: new QueryCache({
          onSuccess: (data) => {
            if ((data == null ? void 0 : data.status) === 401) {
              window.location.href = "/logout";
            }
          }
        }),
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1e3,
            retry: 1
          }
        }
      })
    };
  },
  component: RootComponent
});
function RootDocument({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}

export { getSession_createServerFn_handler };
//# sourceMappingURL=__root-DlR73QbM.mjs.map
