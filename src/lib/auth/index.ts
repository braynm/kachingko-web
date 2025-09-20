import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { API_URL, makeApiClient } from '../utils/api'
import { useAppSession } from '../session'

// TODO: make a shared z object server/client validator
export const authSchema = z.object({
  email: z.string().email('email doesn\'t look right'),
  password: z.string().min(5, 'password minumum of 5 character(s)')
})

type AuthSchema = z.infer<typeof authSchema>

const userResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    token: z.string(),
    user: z.object({
      id: z.number(),
      email: z.string().email(),
    })
  })
}).strict()

export const authenticateCredentialsFn = createServerFn({ method: 'POST' })
  .validator((d: AuthSchema) => d)
  .handler(async ({ data }) => {
    const client = makeApiClient({
      baseUrl: API_URL,
      defaultHeaders: {
        'Content-Type': 'application/json'
      },
    })

    const reqOpts = { body: data, method: 'POST' }
    const resp = await client.request('/api/auth/login',
      userResponseSchema,
      reqOpts
    )()

    if (resp._tag === 'Right') {
      const session = await useAppSession()
      await session.update(resp.right.data)
    }

    return client.handleResponse(resp)
  })

export const logout = createServerFn({ method: 'GET' })
  .handler(async () => {
    // TODO: make api call that removes the previous token makes it invalid.
    const session = await useAppSession()
    await session.clear()

  })
