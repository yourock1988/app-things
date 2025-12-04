import {
  FetchRequestError,
  HttpStatusError,
  ParseJsonError,
} from '../../errors.js'
import sendRequest from './sendRequest.js'

const { APP_ORIGIN } = process.env
const url = `${APP_ORIGIN}/api/v0/accounts/`

export default async function signUp(dto) {
  const [err, data] = await sendRequest(url, 'POST', dto)
  if (err instanceof FetchRequestError) return [{ _errors: ['сервер молчит'] }]
  if (err instanceof ParseJsonError) return [{ _errors: ['сервер не json'] }]
  if (err instanceof HttpStatusError) return [err.msg]
  if (err) return [{ _errors: [err.message] }]
  return [null, data]
}
