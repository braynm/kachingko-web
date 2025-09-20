import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/app/components/layout/Auth'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthenticatedLayout />
}
