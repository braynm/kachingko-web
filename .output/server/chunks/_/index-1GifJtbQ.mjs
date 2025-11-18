import { jsxs, jsx } from 'react/jsx-runtime';
import { T as TableRow, q as TableCell, r as Skeleton, t as Table, v as TableHeader, w as TableHead, x as TableBody, y as Route$2 } from './ssr.mjs';
import { T as TxnPage } from './index-Cde6H0fT.mjs';
import '@tanstack/react-router';
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
import './card-CrVZVFlG.mjs';
import './select-SD1OuLj3.mjs';
import '@radix-ui/react-select';
import './input-Cp6Zj0xY.mjs';
import 'react-sparklines';
import './amount-Cl84T1iu.mjs';
import 'date-fns';

function TableSkeleton({
  length
}) {
  const skeletonRows = Array.from({
    length
  }, (_, index) => /* @__PURE__ */ jsxs(TableRow, { className: "odd:bg-muted/50", children: [
    /* @__PURE__ */ jsx(TableCell, { className: "text-left", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12" }) }),
    /* @__PURE__ */ jsx(TableCell, { className: "font-medium text-left", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16" }) }),
    /* @__PURE__ */ jsx(TableCell, { className: "text-left", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16" }) }),
    /* @__PURE__ */ jsx(TableCell, { className: "text-left", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-52" }) }),
    /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-1", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }) }) })
  ] }, index));
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-bold", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-24" }) }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-bold", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20" }) }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-bold", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20" }) }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-left font-bold", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-52" }) }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-right font-bold", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-1", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20 " }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(TableBody, { children: skeletonRows })
  ] });
}
function RouteComponent() {
  const {
    queryClient
  } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsx(TxnPage, { queryClient });
}

export { TableSkeleton, RouteComponent as component };
//# sourceMappingURL=index-1GifJtbQ.mjs.map
