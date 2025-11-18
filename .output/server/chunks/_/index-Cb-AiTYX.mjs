import * as fs from 'node:fs';
import { n as createServerRpc, l as createServerFn } from './ssr.mjs';
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

export { getCount_createServerFn_handler, updateCount_createServerFn_handler };
//# sourceMappingURL=index-Cb-AiTYX.mjs.map
