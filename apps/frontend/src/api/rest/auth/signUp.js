import processError from '../processError.js'
import sendRequest from '../sendRequest.js'

const { APP_ORIGIN } = process.env
const url = `${APP_ORIGIN}/api/v0/auth/sign-up`

export default async function signUp(dto) {
  const [err, data] = await sendRequest(url, 'POST', dto)
  if (err) return [processError(err)]
  return [null, data]
}
