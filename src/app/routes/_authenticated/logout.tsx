import z from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { logout } from '@/lib/auth'
import { useAppSession } from '@/lib/session'
import { API_URL, makeApiClient } from '@/lib/utils/api'

const logoutSchema = z.object({
  success: z.boolean(),
  data: z.string()
})

const logoutFn = createServerFn({
  method: 'GET'
}).handler(async () => {
  const session = await useAppSession()
  const sessionData = session.data
  const client = makeApiClient({
    baseUrl: API_URL,
    defaultHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.token}` // Token passed from loader
    }
  })

  const url = `/api/auth/logout`
  const request = await client.request(url, logoutSchema)()
  console.log('API REQUEST LOGOUT: ', url)

  const response = client.handleResponse(request)
  return response
})

export const Route = createFileRoute('/_authenticated/logout')({
  component: RouteComponent,
  loader: async () => {
    await Promise.all([logout(), logoutFn()])
    throw redirect({ to: '/login' })
  }
})

function RouteComponent() {
  return <div></div>
}
