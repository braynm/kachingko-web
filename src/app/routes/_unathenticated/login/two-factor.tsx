import { TwoFactorLoginPage } from '@/app/pages/TwoFactorLogin'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unathenticated/login/two-factor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TwoFactorLoginPage />
}
