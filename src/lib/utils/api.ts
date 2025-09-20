import { pipe } from 'fp-ts/lib/function'
import { ZodSchema } from 'zod'
import {
  TaskEither,
  chain,
  chainEitherK,
  left,
  right,
  tryCatch,
} from 'fp-ts/TaskEither'

import {
  Either,
  left as Eleft,
  match,
  right as Eright,
} from 'fp-ts/Either'

type FetchErrorType = 'HttpError' | 'JsonError' | 'InvalidJson'
interface RequestError {
  type: FetchErrorType
  error: Error,
  status?: number
}

const fromZod = <A>(
  schema: ZodSchema<A>
) => (input: unknown): Either<RequestError, A> => {
  try {
    if (typeof schema.safeParse !== 'function') {
      console.error('Invalid schema passed to fromZod:', schema)
      return Eleft({
        type: 'JsonError',
        error: new Error('Invalid Zod schema provided')
      })
    }

    const result = schema.safeParse(input)
    return result.success ? Eright(result.data) : Eleft({
      type: 'JsonError',
      error: new Error(result.error.message)
    })
  } catch (error) {
    console.error('ZodType constructor error:', error)
    return Eleft({
      type: 'JsonError',
      error: new Error(`Schema validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    })
  }
}

const handleRequestStatus = (res: Response): TaskEither<RequestError, Response> => {
  if (res.status >= 500) {
    return left({
      type: 'HttpError',
      error: new Error(`Something went wrong. Please try again later.`),
      status: res.status
    })
  }

  return right(res)
}

const parseJson = (res: Response) => tryCatch(
  () => res.json().then(response => ({ response, status: res.status })),
  (error: Error): RequestError => ({
    type: 'InvalidJson',
    error: new Error(error.message),
    status: res.status
  })
)

const fetchJsonError = (error: unknown): RequestError => {
  console.log('fetchJsonError: ', error)
  return ({ type: 'HttpError', error: new Error(`Can't connect to the server. Please try again later.`) })
}

const extractErrorMessage = (success: boolean, error: unknown): string => {
  if (typeof error === 'string') {
    return error
  }
  return `Something went wrong. Please try again later.`
}

type ProcessResponseT = { status: number, response: { success: true, data: unknown } }
  | { status: number, response: { success: false, error: string } }

const processJsonResponse = <A>(
  schema: ZodSchema<A>
) => (result: ProcessResponseT): Either<RequestError, A> => {
  const { response } = result
  if (!response.success) {
    const errorMessage = extractErrorMessage(response.success, response.error)
    return Eleft({
      type: 'HttpError',
      error: new Error(errorMessage),
      status: result.status
    })
  }

  return fromZod(schema)(response)
}

export const API_URL = 'http://localhost:8888'
export type Validator<A> = (input: unknown) => Either<Error, A>

export interface ApiConfig {
  baseUrl: string,
  defaultHeaders: Record<string, string>
}

type RequestResponse<A> = { success: false, error: Error, status: number } | { success: true, data: A, status?: number }

export interface ApiClient {
  withToken: (token: string) => ApiClient,
  handleResponse: <A extends { success: boolean; data: unknown }>(
    response: Either<RequestError, A>,
    onError?: (error: Error, errorType: FetchErrorType, status?: number) => void
  ) => RequestResponse<A['data']>,
  request: <A>(
    endpoint: string,
    schema: ZodSchema<A>,
    options?: { method?: string; headers?: Record<string, string>; body?: unknown, signal?: AbortSignal }
  ) => TaskEither<RequestError, A>
}

export const makeApiClient = (config: ApiConfig): ApiClient => {
  const request = <A>(
    endpoint: string,
    schema: ZodSchema<A>,
    options: {
      method?: string,
      headers?: Record<string, string>,
      body?: unknown,
      signal?: AbortSignal
    } = {}
  ): TaskEither<RequestError, A> => {
    const url = `${config.baseUrl}${endpoint}`
    const headers = {
      ...(config.defaultHeaders || {}),
      ...(options?.headers || {}),
    }

    let payload: FormData | string | undefined
    if (options?.body instanceof FormData) {
      payload = options.body
    } else if (options?.body) {
      headers['Content-Type'] = 'application/json'
      payload = JSON.stringify(options.body)
    }

    const init: RequestInit = {
      method: options?.method || 'GET',
      headers,
      body: payload,
      signal: options?.signal
    }

    return pipe(
      tryCatch(
        () => fetch(url, init),
        fetchJsonError
      ),
      chain(handleRequestStatus),
      chain(parseJson),
      chainEitherK(processJsonResponse<A>(schema))
    )
  }

  const withToken = (token: string) => makeApiClient({
    ...config,
    defaultHeaders: {
      ...(config.defaultHeaders || {}),
      Authorization: `Bearer ${token}`
    }
  })

  const handleResponse = <A extends { success: boolean; data: unknown }>(
    response: Either<RequestError, A>,
    onError?: (error: Error, errorType: FetchErrorType, status?: number) => void
  ): RequestResponse<A['data']> => {
    return match<RequestError, A, RequestResponse<A['data']>>(
      ({ error, type, status }) => {
        if (onError) {
          onError(error, type, status)
        }
        return { success: false as const, error, status: status ?? 0 }
      },
      (data: A) => {
        return { success: true as const, data: data.data }
      }
    )(response)
  }

  return { request, handleResponse, withToken }
}
