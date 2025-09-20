import { type ReactNode } from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  Outlet,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import appCss from '@/app/styles/app.css?url'
import { useAppSession } from '@/lib/session'
import { ThemeProvider } from '@/app/components/ThemeSwitcher/theme-provider'
import { SidebarProvider } from "@/app/components/ui/sidebar"

interface RootRouteContext {
  queryClient: QueryClient,
  session?: any
}

const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  // We need to auth on the server so we have access to secure cookies
  const session = await useAppSession()

  if (!session.data.token) {
    return null
  }

  return session.data

})

export async function clientSession() {
  const result = await getSession()
  return result?.data
}


export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'KachingKo — Track & Understand Your Credit Card Spending',
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],

  }),
  beforeLoad: async () => {
    const session = await getSession()
    return { session }
  },
  notFoundComponent: () => <div>404 Not Found</div>,
  context: () => {
    return ({
      queryClient: new QueryClient({
        queryCache: new QueryCache({
          onSuccess: (data: any) => {
            // TODO: make it more elegant and handle xhr api call level
            if (data?.status === 401) {
              window.location.href = '/logout'
            }
          }
        }),
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1
          },
        },
      }),
    })
  },

  component: RootComponent,
})

function RootComponent() {
  const { queryClient } = Route.useRouteContext()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey='vite-ui-theme'>
        <RootDocument>
          <SidebarProvider>
            <Outlet />
          </SidebarProvider>
        </RootDocument>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

