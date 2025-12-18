import processError from '../processError.js'
import sendRequest from '../sendRequest.js'

const { APP_ORIGIN } = process.env
const url = `${APP_ORIGIN}/api/v0/auth/sign-in`

export default async function signIn(dto) {
  const [err, data] = await sendRequest(url, 'POST', dto)
  if (err) return [processError(err)]
  return [null, data]
}
