import { createFileRoute } from '@tanstack/react-router'
import { SettingsProfilePage } from '@/app/pages/SettingsProfilePage'

export const Route = createFileRoute('/_authenticated/settings/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SettingsProfilePage />
}
