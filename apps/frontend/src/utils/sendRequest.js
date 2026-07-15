import {
  FetchRequestError,
  ParseJsonError,
  HttpEmptyError,
  HttpRespError,
} from '@/errors.js'

export default async function sendRequest(url, method = 'GET', payload = null) {
  let resp
  let data
  let text
  const credentials = 'include'
  const options = { credentials, method, signal: AbortSignal.timeout(5000) }

  if (payload) {
    options.headers = { 'Content-Type': 'application/json' }
    options.body = JSON.stringify(payload)
    // handle bad payload error
  }

  try {
    resp = await fetch(url, options)
  } catch (e) {
    if (e instanceof TypeError || e.name === 'AbortError') {
      return [new FetchRequestError('fail fetch', { cause: e })]
    }
    throw new Error('unhandled error', { cause: e })
  }

  if (resp.status === 204) return [null, true]

  if ([409, 401, 403, 404, 405, 500].includes(resp.status)) {
    return [new HttpEmptyError('bad status', { cause: resp.status })]
  }

  try {
    text = await resp.text()
    data = JSON.parse(text)
  } catch (e) {
    if (e instanceof SyntaxError) {
      return [new ParseJsonError('not json', { cause: e })]
    }
    throw new Error('unhandled error', { cause: e })
  }

  if ([400].includes(resp.status)) {
    // return [new HttpRespError(data)]
    return [new HttpRespError('bad request', { cause: data })]
  }

  return [null, data]
}
