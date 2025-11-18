import { jsx, jsxs } from 'react/jsx-runtime';
import { Link, Outlet } from '@tanstack/react-router';
import { T as ThemeSwitcher } from './index-Bx4ItRZi.mjs';
import '@radix-ui/react-toggle';
import 'class-variance-authority';
import './ssr.mjs';
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

function UnauthenticatedLayout() {
  return /* @__PURE__ */ jsxs("div", { className: "unauthenticated-layout container mx-auto w-2xl flex flex-col min-h-screen ", children: [
    /* @__PURE__ */ jsx("header", { className: "header py-5", children: /* @__PURE__ */ jsxs("div", { className: "header-content flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "logo font-extrabold ", children: "KACHINGKO" }),
      /* @__PURE__ */ jsxs("nav", { className: "header-nav flex gap-4 items-center", children: [
        /* @__PURE__ */ jsx(ThemeSwitcher, {}),
        /* @__PURE__ */ jsx(
          Link,
          {
            activeProps: {
              className: "hover:text-primary hover:font-medium active",
              style: { color: "text-primary", fontWeight: "bold" }
            },
            to: "/login",
            children: "Login"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            activeProps: {
              className: "hover:text-primary hover:font-medium active",
              style: { color: "text-primary", fontWeight: "bold" }
            },
            to: "/signup",
            children: "Sign Up"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "main-content flex items-center min-h-[calc(100vh-10rem)]", children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      " "
    ] })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsx(UnauthenticatedLayout, {});
}

export { RouteComponent as component };
//# sourceMappingURL=_unathenticated-In_zNY0g.mjs.map
