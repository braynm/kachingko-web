import { LoginPage } from '@/app/pages/LoginPage'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: ({ context }) => {
    const url = context?.session?.token ? '/txns' : '/login'

    throw redirect({ to: url })
  }
})

function RouteComponent() {
  return <div>Home.</div>
}

