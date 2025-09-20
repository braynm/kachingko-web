import { LoginPage } from '@/app/pages/LoginPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unathenticated/login')({
  component: RouteComponent
})

function RouteComponent() {
  return <LoginPage className='w-full' />
}
