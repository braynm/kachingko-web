import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { TxnUploadPage } from '@/app/pages/TxnUploadPage'
import { useAppSession } from '@/lib/session'
import { API_URL, makeApiClient } from '@/lib/utils/api'

export const Route = createFileRoute('/_authenticated/txns/upload')({
  component: RouteComponent,
})

const listUserCardSchema = z.object({
  success: z.boolean(),
  data: z.array(z.object({
    bank: z.string(),
    id: z.string(),
    name: z.string(),
  }))
})

export const listUserCardsFn = createServerFn({
  method: 'GET'
})
  .handler(async () => { // Use data property
    const session = await useAppSession()
    const sessionData = session.data
    const reqOpts = { method: 'GET' }
    const client = makeApiClient({
      baseUrl: API_URL,
      defaultHeaders: {
        'Authorization': `Bearer ${sessionData.token}` // Token passed from loader
      }
    })


    const url = '/api/statements/cards'
    const request = await client.request(url, listUserCardSchema, reqOpts)()
    const response = client.handleResponse(request)

    return response
  })

const uploadSchema = z.object({
  success: z.boolean(),
  data: z.array(z.any())
})

export const uploadTxnsFn = createServerFn({
  method: 'POST'
})
  .validator((input: FormData) => input) // This expects { data: FormData }
  .handler(async ({ data }) => { // Use data property
    if (!(data instanceof FormData)) {
      throw new Error('Invalid Form Data')
    }

    const session = await useAppSession()
    const sessionData = session.data
    const reqOpts = { body: data, method: 'POST' }
    const client = makeApiClient({
      baseUrl: API_URL,
      defaultHeaders: {
        'Authorization': `Bearer ${sessionData.token}` // Token passed from loader
      }
    })


    const url = '/api/statements/upload'
    const request = await client.request(url, uploadSchema, reqOpts)()
    const response = client.handleResponse(request)

    return response
  })

const createNewCardSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.string(),
    name: z.string(),
    bank: z.string(),
  })
})

export const createNewCardFn = createServerFn({
  method: 'POST'
})
  .validator((input: { bank: string, name: string }) => input) // This expects { data: FormData }
  .handler(async ({ data }) => { // Use data property
    const session = await useAppSession()
    const sessionData = session.data
    const reqOpts = { body: { bank: data.bank, card_name: data.name }, method: 'POST' }
    const client = makeApiClient({
      baseUrl: API_URL,
      defaultHeaders: {
        'Authorization': `Bearer ${sessionData.token}` // Token passed from loader
      }
    })


    const url = '/api/statements/new-card'
    const request = await client.request(url, createNewCardSchema, reqOpts)()
    const response = client.handleResponse(request)

    return response
  })


function RouteComponent() {
  const { queryClient } = Route.useRouteContext()
  return <TxnUploadPage queryClient={queryClient} />
}
