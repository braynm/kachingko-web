import z from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { createFileRoute } from '@tanstack/react-router'
import { SignupPage } from '@/app/pages/SignupPage'
import { API_URL, makeApiClient } from '@/lib/utils/api'
import { useAppSession } from '@/lib/session'

export const Route = createFileRoute('/_unathenticated/signup')({
  component: RouteComponent,
})

const signupSchema = z.object({
  email: z.string().email('email doesn\'t look right'),
  password: z.string().min(5, 'password minumum of 5 character(s)'),
  confirmPassword: z.string().min(5, 'password minumum of 5 character(s)')
}).refine((data) => data.password === data.confirmPassword, {
  message: "password do not match",
  path: ["confirmPassword"], // this makes the error show on confirmPassword
})

type SignupSchema = z.infer<typeof signupSchema>

const signupResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    token: z.string(),
    user: z.object({
      id: z.number(),
      email: z.string().email(),
    })
  })
})

export const signupFn = createServerFn({ method: 'POST' })
  .validator((d: SignupSchema) => d)
  .handler(async ({ data }) => {
    const client = makeApiClient({
      baseUrl: API_URL,
      defaultHeaders: {
        'Content-Type': 'application/json'
      },
    })

    const reqOpts = { body: data, method: 'POST' }
    const resp = await client.request('/api/auth/register',
      signupResponseSchema,
      reqOpts
    )()

    if (resp._tag === 'Right') {
      const session = await useAppSession()
      await session.update(resp.right.data)
    }

    return client.handleResponse(resp)
  })

function RouteComponent() {
  return <SignupPage className='w-full' />
}
