import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unathenticated/two-factor-login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_unathenticated/twofactor"!</div>
}
