import sendRequest from './sendRequest'

const { APP_ORIGIN } = process.env
const url = `${APP_ORIGIN}/api/v0/products/`

export async function getProducts() {
  const response = await sendRequest(url)
  const normalizedProducts = normalizeProducts(response.payload)
  return normalizedProducts
}

export async function getProductById(id) {
  const response = await sendRequest(url + id)
  return response.payload
}

export async function postProduct(product) {
  const response = await sendRequest(url, 'POST', product)
  return response.payload
}

export async function patchProductById(id, product) {
  const response = await sendRequest(url + id, 'PATCH', product)
  return response.payload
}

export async function deleteProductById(id) {
  const response = await sendRequest(url + id, 'DELETE')
  return response
}
