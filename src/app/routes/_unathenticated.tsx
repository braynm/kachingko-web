import { createFileRoute } from '@tanstack/react-router'
import { UnauthenticatedLayout } from '@/app/components/layout/NonAuth'

export const Route = createFileRoute('/_unathenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UnauthenticatedLayout />
}
