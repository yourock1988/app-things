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
  }

  try {
    resp = await fetch(url, options)
  } catch (e) {
    if (e instanceof TypeError) return [new FetchRequestError(e.message)]
    if (e.name === 'AbortError') return [new FetchRequestError(e.message)]
    throw new Error(e.message)
  }

  if (resp.status === 204) return [null, true]

  if ([409, 401, 403, 404, 405, 500].includes(resp.status)) {
    return [new HttpEmptyError(resp.status)]
  }

  try {
    text = await resp.text()
    data = JSON.parse(text)
  } catch (e) {
    if (e instanceof SyntaxError) return [new ParseJsonError(e.message), text]
    throw new Error(e.message)
  }

  if ([400].includes(resp.status)) {
    return [new HttpRespError(data)]
  }

  return [null, data]
}
