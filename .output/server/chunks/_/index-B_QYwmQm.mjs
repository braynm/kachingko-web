import { jsxs, jsx } from 'react/jsx-runtime';
import * as fs from 'node:fs';
import { useNavigate, useRouter, Link } from '@tanstack/react-router';
import { R as Route$7, l as createServerFn, B as Button, m as logout, n as createServerRpc } from './ssr.mjs';
import { useQuery, queryOptions, useQueryClient, useMutation } from '@tanstack/react-query';
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

function useStaticQuery(options) {
  return useQuery({
    ...options,
    staleTime: 1e3 * 60 * 60,
    // 1 hour - rarely changes
    cacheTime: 1e3 * 60 * 60 * 24,
    // 24 hour cache
    retry: 1
    // Minimal retries
  });
}
const filePath = "/Users/brymadrid/Desktop/count.txt";
async function readCount() {
  return parseInt(await fs.promises.readFile(filePath, "utf-8").catch(() => "0"));
}
const getCount_createServerFn_handler = createServerRpc("src_app_routes_index_tsx--getCount_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getCount.__executeServer(opts, signal);
});
const getCount = createServerFn({
  method: "GET"
}).handler(getCount_createServerFn_handler, () => {
  return readCount();
});
const updateCount_createServerFn_handler = createServerRpc("src_app_routes_index_tsx--updateCount_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return updateCount.__executeServer(opts, signal);
});
const updateCount = createServerFn({
  method: "POST"
}).validator((d) => d).handler(updateCount_createServerFn_handler, async ({
  data
}) => {
  const count = await readCount();
  await fs.promises.writeFile(filePath, `${count + data}`);
  return count + data;
});
const todoQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: async () => {
    const req = await fetch("https://jsonplaceholder.typicode.com/todos");
    const json = await req.json();
    return Promise.resolve(json);
  }
});
const countQueryOptions = queryOptions({
  queryKey: ["count"],
  queryFn: async () => {
    return getCount();
  }
});
function Home() {
  const {
    session
  } = Route$7.useRouteContext();
  useStaticQuery(todoQueryOptions);
  const countQuery = useQuery(countQueryOptions);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const router = useRouter();
  const countMutate = useMutation({
    mutationFn: async (count) => {
      return updateCount({
        data: count
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["count"]
      });
    }
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "Hello World" }),
    /* @__PURE__ */ jsx(Link, { to: "/login", children: "Go to login" }),
    /* @__PURE__ */ jsx(Button, { className: "cursor-pointer", type: "button", onClick: async (e) => {
      e.preventDefault();
      try {
        await logout();
        await router.invalidate();
        navigate({
          to: "/login"
        });
      } catch (error) {
        console.log("errrror @@@@", error);
      }
    }, children: "Logout" }),
    /* @__PURE__ */ jsxs(Button, { className: "cursor-pointer", type: "button", onClick: async (e) => {
      e.preventDefault();
      countMutate.mutate(1);
    }, children: [
      "Add 1 to ",
      countQuery.data,
      "?"
    ] })
  ] });
}

export { Home as component };
//# sourceMappingURL=index-B_QYwmQm.mjs.map
