// FIXME:

import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo'
import teapotsSeed from '../seeds/teapotsSeed'
import teapotsTable from '../../src/utils/tables/teapotsTable'
import dtoTeapotAddFixture from '../fixtures/teapots/dtoTeapotAddFixture'
import dtoTeapotUpdFixture from '../fixtures/teapots/dtoTeapotUpdFixture'
import respTeapotAddedFixture from '../fixtures/teapots/respTeapotAddedFixture'
import respTeapotUpdatedFixture from '../fixtures/teapots/respTeapotUpdatedFixture'
import { makeResetTable, clListen, clSend } from './helpers'

const resetTable = makeResetTable(teapotsTable, teapotsSeed)
const port = 20032
const ns = '/teapots'
const url = `http://localhost:${port}${ns}`
let cl0, cl1

beforeAll(() => {
  io.listen(port)
})
afterAll(() => {
  io.close()
})
beforeEach(async () => {
  resetTable()
  return new Promise((resolve, reject) => {
    let { promise: p0, resolve: res0, reject: rej0 } = Promise.withResolvers()
    let { promise: p1, resolve: res1, reject: rej1 } = Promise.withResolvers()
    cl0 = ioc(url, { extraHeaders: { sessionid: 'abcdef' } })
    cl1 = ioc(url, { extraHeaders: { sessionid: 'fedcba' } })
    cl0.on('connect_error', rej0)
    cl1.on('connect_error', rej1)
    cl0.on('connect', res0)
    cl1.on('connect', res1)
    Promise.all([p0, p1]).then(resolve).catch(reject)
  })
})
afterEach(() => {
  cl0.disconnect()
  cl1.disconnect()
})

it('positive post teapot', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:teapot:added', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:teapot:added')
  const r = await clSend(cl0, 'teapot:add', '', dtoTeapotAddFixture)
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respTeapotAddedFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive patch teapot by id', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:teapot:updated', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:teapot:updated')
  const r = await clSend(cl0, 'teapot:updateById', 4201, dtoTeapotUpdFixture)
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respTeapotUpdatedFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive delete teapot by id', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:teapot:deleted', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:teapot:deleted')
  const r = await clSend(cl0, 'teapot:removeById', 4201, '')
  const r1 = await promise1
  expect(r).toBeUndefined()
  expect(r1).toBe(4201)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive cl:teapot-turn_on', async () => {
  const respTeapotTurnedOnFixture = {
    id: 4201,
    ongoing: 'boiling',
    temperature: 30,
  }
  const mockHandler = vi.fn()
  cl0.once('bc-cl:teapot-turned_on', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:teapot-turned_on')
  const r = await clSend(cl0, 'cl:teapot-turn_on', 4201, '')
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respTeapotTurnedOnFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive cl:teapot-turn_off', async () => {
  const respTeapotTurnedOnFixture = {
    id: 4201,
    ongoing: 'idle',
    temperature: expect.toSatisfy((val: number) => val > 34),
  }
  // FIXME:
  // await clSend(cl0, 'cl:teapot-turn_on', 4201, '')
  await new Promise(res => setTimeout(res, 499))
  const mockHandler = vi.fn()
  cl0.once('bc-cl:teapot-turned_off', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:teapot-turned_off')
  const r = await clSend(cl0, 'cl:teapot-turn_off', 4201, '')
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respTeapotTurnedOnFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive cl:teapot-drain', async () => {
  const respTeapotTurnedOnFixture = {
    id: 4201,
    ongoing: 'idle',
    temperature: 0,
  }
  // FIXME:
  // await clSend(cl0, 'cl:teapot-turn_on', 4201, '')
  // await new Promise(res => setTimeout(res, 499))
  const mockHandler = vi.fn()
  cl0.once('bc-cl:teapot-drained', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:teapot-drained')
  const r = await clSend(cl0, 'cl:teapot-drain', 4201, '')
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respTeapotTurnedOnFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})
