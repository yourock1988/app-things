import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo'

const port = 20020
const ns = '/users'
const url = `http://localhost:${port}${ns}`
let cl

beforeAll(() => {
  io.listen(port)
})
afterAll(() => {
  io.close()
})
afterEach(() => {
  cl.disconnect()
})

it('connected with admin session cookie', async () => {
  const r = await new Promise<any>((resolve, reject) => {
    cl = ioc(url, { extraHeaders: { sessionid: 'abcdef' } })
    cl.on('connect', resolve)
    cl.on('connect_error', reject)
  })
  expect(r).toBeUndefined()
  expect(cl.connected).toBeTruthy()
  expect(cl.id).toBeTypeOf('string')
})
it('connected with user session cookie', async () => {
  const r = await new Promise<any>((resolve, reject) => {
    cl = ioc(url, { extraHeaders: { sessionid: 'fedcba' } })
    cl.on('connect', resolve)
    cl.on('connect_error', reject)
  })
  expect(r).toBeUndefined()
  expect(cl.connected).toBeTruthy()
  expect(cl.id).toBeTypeOf('string')
})
it('unauthorized without session cookie', async () => {
  const r = await new Promise<any>((resolve, reject) => {
    cl = ioc(url)
    cl.on('connect', reject)
    cl.on('connect_error', resolve)
  })
  expect(r.data.code).toBe(401)
  expect(r.message).toBe('unauthorized')
})
it('unauthorized with bad session cookie', async () => {
  const r = await new Promise<any>((resolve, reject) => {
    cl = ioc(url, { extraHeaders: { sessionid: 'bad' } })
    cl.on('connect', reject)
    cl.on('connect_error', resolve)
  })
  expect(r.data.code).toBe(401)
  expect(r.message).toBe('unauthorized')
})
it('forbidden with low perm session cookie', async () => {
  const r = await new Promise<any>((resolve, reject) => {
    cl = ioc(url, { extraHeaders: { sessionid: 'ffffff' } })
    cl.on('connect', reject)
    cl.on('connect_error', resolve)
  })
  expect(r.data.code).toBe(403)
  expect(r.message).toBe('forbidden')
})
