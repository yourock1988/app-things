import sendRequest from './sendRequest'

async function auth() {
  const { APP_ORIGIN } = process.env
  const url = `${APP_ORIGIN}/api/v0/auth`
  await sendRequest(url)
}

export default auth
