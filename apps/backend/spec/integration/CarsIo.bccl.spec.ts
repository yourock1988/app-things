import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo'
import carsSeed from '../seeds/carsSeed'
import carsTable from '../../src/utils/tables/carsTable'
import dtoCarAddFixture from '../fixtures/cars/dtoCarAddFixture'
import dtoCarUpdFixture from '../fixtures/cars/dtoCarUpdFixture'
import respCarAddedFixture from '../fixtures/cars/respCarAddedFixture'
import respCarUpdatedFixture from '../fixtures/cars/respCarUpdatedFixture'
import { makeResetTable, clListen, clSend } from './helpers'

const resetTable = makeResetTable(carsTable, carsSeed)
const port = 20012
const ns = '/cars'
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

it('positive post car', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:car:added', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:car:added')
  const r = await clSend(cl0, 'car:add', '', dtoCarAddFixture)
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respCarAddedFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive patch car by id', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:car:added', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:car:updated')
  const r = await clSend(cl0, 'car:updateById', 1001, dtoCarUpdFixture)
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respCarUpdatedFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive delete car by id', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:car:added', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:car:deleted')
  const r = await clSend(cl0, 'car:removeById', 1001, '')
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toBeUndefined()
  expect(mockHandler).not.toHaveBeenCalled()
})
