/* eslint-disable no-await-in-loop */
import type { AxiosError } from 'axios'

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const FAILED_PRECONDITION_STATUS = 412

type Exponential = boolean
type WaitTime = number
type RetryMode = Exponential | WaitTime

export interface RetryOptions {
  maxAttempts?: number
  timesTried?: number
  retry?: RetryMode
}

const isAxiosError = (err: unknown | AxiosError): err is AxiosError =>
  (err as AxiosError)?.isAxiosError

const isAxiosFailedPreconditionError = (err: unknown): boolean =>
  isAxiosError(err) && err.response?.status === FAILED_PRECONDITION_STATUS

const isNumber = (value: unknown): boolean => !Number.isNaN(Number(value))

export async function retryIfPreconditionFailed<T = void>(
  promise: () => Promise<T>,
  { maxAttempts = 2, timesTried = 0, retry = 0 }: RetryOptions
): Promise<T> {
  let attempts = timesTried
  let lastError

  do {
    try {
      const res = await promise()

      return Promise.resolve(res)
    } catch (err) {
      lastError = err
      if (!isAxiosFailedPreconditionError(err)) {
        return Promise.reject(err)
      }

      // 10^timesTried [1ms, 10ms, 100ms, 1s, 10s, ...]
      await sleep(isNumber(retry) ? (retry as number) : 10 ** timesTried)
    }

    attempts++
  } while (attempts < maxAttempts)

  return Promise.reject(lastError)
}
