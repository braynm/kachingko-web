import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { routeTree } from '@/app/routeTree.gen'

interface RouterContext {
  session: any,
  queryClient: QueryClient
}


export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    context: {
      queryClient: undefined!,
      session: undefined!
    } as RouterContext
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
