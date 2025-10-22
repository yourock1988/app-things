async function sendRequest(url, method = 'GET', payload = null) {
  const request = {
    method,
    credentials: 'include',
  }

  if (payload) {
    request.headers = {
      'Content-Type': 'application/json',
    }
    request.body = JSON.stringify(payload)
  }

  const resp = await fetch(url, request)
  const text = await resp.text()
  if (text) {
    const json = JSON.parse(text)
    return json
  }
  return {}
}

export default sendRequest
