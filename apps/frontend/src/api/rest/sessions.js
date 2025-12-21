import processError from './processError.js'
import sendRequest from './sendRequest.js'

const { APP_ORIGIN } = process.env
const url = `${APP_ORIGIN}/api/v0/sessions`

export async function getAll() {
  const [err, data] = await sendRequest(url, 'GET')
  if (err) return [processError(err)]
  return [null, data]
}

export async function getById(id) {
  const [err, data] = await sendRequest(`${url}/${id}`, 'GET')
  if (err) return [processError(err)]
  return [null, data]
}

export async function add(dto) {
  const [err, data] = await sendRequest(url, 'POST', dto)
  if (err) return [processError(err)]
  return [null, data]
}

export async function updateById(id, dto) {
  const [err, data] = await sendRequest(`${url}/${id}`, 'PATCH', dto)
  if (err) return [processError(err)]
  return [null, data]
}

export async function removeById(id) {
  const [err, data] = await sendRequest(`${url}/${id}`, 'DELETE')
  if (err) return [processError(err)]
  return [null, data]
}
