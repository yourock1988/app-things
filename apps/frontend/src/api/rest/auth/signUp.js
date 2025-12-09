import {
  FetchRequestError,
  HttpEmptyError,
  HttpRespError,
  ParseJsonError,
} from '../../../errors.js'
import sendRequest from '../sendRequest.js'

const { APP_ORIGIN } = process.env
const url = `${APP_ORIGIN}/api/v0/auth/sign-up`

export default async function signUp(dto) {
  const [err, data] = await sendRequest(url, 'POST', dto)
  if (err instanceof FetchRequestError) return [{ _errors: ['сервер молчит'] }]
  if (err instanceof ParseJsonError) return [{ _errors: ['сервер не json'] }]
  if (err instanceof HttpRespError) return [err.cause]
  if (err instanceof HttpEmptyError) {
    if (err.cause === 409) return [{ _errors: ['Такой никнейм уже зареган'] }]
    if (err.cause === 401) return [{ _errors: ['Войдите в систему'] }]
    if (err.cause === 403) return [{ _errors: ['Недостаточно прав'] }]
    if (err.cause === 404) return [{ _errors: ['Ресурс отсутствует'] }]
    if (err.cause === 405) return [{ _errors: ['Недопустимый метод'] }]
    if (err.cause === 500) return [{ _errors: ['Ошибка сервера'] }]
  }
  if (err) return [{ _errors: [err.message] }]
  return [null, data]
}
