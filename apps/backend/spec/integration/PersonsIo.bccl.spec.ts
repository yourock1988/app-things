import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo.js'
import personsSeed from '../seeds/personsSeed.js'
// import personsTable from '../../src/utils/tables/personsTable.js'
import personsTable from '../../src/person/infra/personsTable.js'
import dtoPersonAddFixture from '../fixtures/persons/dtoPersonAddFixture.js'
import dtoPersonUpdFixture from '../fixtures/persons/dtoPersonUpdFixture.js'
import respPersonAddedFixture from '../fixtures/persons/respPersonAddedFixture.js'
import respPersonUpdatedFixture from '../fixtures/persons/respPersonUpdatedFixture.js'
import { makeResetTable, clListen, clSend } from './helpers.js'

const resetTable = makeResetTable(personsTable, personsSeed)
const port = 20022
const ns = '/persons'
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

it('positive post person', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:person:added', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:person:added')
  const r = await clSend(cl0, 'person:add', '', dtoPersonAddFixture)
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respPersonAddedFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive patch person by id', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:person:updated', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:person:updated')
  const r = await clSend(cl0, 'person:updateById', 101, dtoPersonUpdFixture)
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respPersonUpdatedFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive delete person by id', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:person:deleted', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:person:deleted')
  const r = await clSend(cl0, 'person:removeById', 101, '')
  const r1 = await promise1
  expect(r).toBeUndefined()
  expect(r1).toBe(101)
  expect(mockHandler).not.toHaveBeenCalled()
})
