import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo'
import usersSeed from '../seeds/usersSeed'
import usersTable from '../../src/utils/tables/usersTable'
import dtoUserAddFixture from '../fixtures/users/dtoUserAddFixture'
import dtoUserUpdFixture from '../fixtures/users/dtoUserUpdFixture'
import respUserAddedFixture from '../fixtures/users/respUserAddedFixture'
import respUserUpdatedFixture from '../fixtures/users/respUserUpdatedFixture'
import { makeResetTable, clListen, clSend } from './helpers'

const resetTable = makeResetTable(usersTable, usersSeed)
const port = 20022
const ns = '/users'
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

it('positive post user', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:user:added', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:user:added')
  const r = await clSend(cl0, 'user:add', '', dtoUserAddFixture)
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respUserAddedFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive patch user by id', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:user:added', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:user:updated')
  const r = await clSend(cl0, 'user:updateById', 101, dtoUserUpdFixture)
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toEqual(respUserUpdatedFixture)
  expect(mockHandler).not.toHaveBeenCalled()
})

it('positive delete user by id', async () => {
  const mockHandler = vi.fn()
  cl0.once('bc-cl:user:added', mockHandler)
  const promise1 = clListen(cl1, 'bc-cl:user:deleted')
  const r = await clSend(cl0, 'user:removeById', 101, '')
  const r1 = await promise1
  expect(r1).toEqual(r)
  expect(r1).toBeUndefined()
  expect(mockHandler).not.toHaveBeenCalled()
})
