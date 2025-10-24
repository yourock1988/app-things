import sendRequest from './sendRequest'

const { APP_ORIGIN } = process.env
const url = `${APP_ORIGIN}/api/v0/users/`

export async function getUsers() {
  const response = await sendRequest(url)
  return response
}

export async function getUserById(id) {
  const response = await sendRequest(url + id)
  return response
}

export async function postUser(user) {
  const response = await sendRequest(url, 'POST', user)
  return response
}

export async function patchUserById(id, user) {
  const response = await sendRequest(url + id, 'PATCH', user)
  return response
}

export async function deleteUserById(id) {
  await sendRequest(url + id, 'DELETE')
}
