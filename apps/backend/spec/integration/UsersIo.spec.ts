import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo'
import usersTable from '../../src/utils/tables/usersTable'
import usersSeed from '../seeds/usersSeed'

import dtoUserAddFixture from '../fixtures/users/dtoUserAddFixture'
import dtoUserUpdFixture from '../fixtures/users/dtoUserUpdFixture'

import respUserAddedFixture from '../fixtures/users/respUserAddedFixture'
import respUserByIdFixture from '../fixtures/users/respUserByIdFixture'
import respUserUpdatedFixture from '../fixtures/users/respUserUpdatedFixture'
import respUsersAllFixture from '../fixtures/users/respUsersAllFixture'

import tableUsersAllFixture from '../fixtures/users/tableUsersAllFixture'
import tableUsersWithAddedFixture from '../fixtures/users/tableUsersWithAddedFixture'
import tableUsersWithoutDeletedFixture from '../fixtures/users/tableUsersWithoutDeletedFixture'
import tableUsersWithUpdatedFixture from '../fixtures/users/tableUsersWithUpdatedFixture'

const resetTable = () =>
  usersTable.splice(0, Infinity, ...structuredClone(usersSeed))

function waitFor(socket, event) {
  return new Promise(resolve => {
    socket.once(event, resolve)
  })
}
function clSend(socket, ...args) {
  return new Promise((resolve, reject) => {
    socket.emit(...args, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
function clientListen(socket, eventName) {
  return new Promise(resolve => {
    socket.once(eventName, resolve)
  })
}

const port = 3334
const ns = '/users'
const url = `http://localhost:${port}${ns}`
let sv, cl

beforeAll(() => {
  io.listen(port)
})
afterAll(() => {
  io.close()
})
beforeEach(() => {
  resetTable()
})

describe('client-role:admin', () => {
  beforeEach(() => {
    return new Promise((resolve, reject) => {
      cl = ioc(url, { extraHeaders: { sessionid: 'abcdef' } })
      cl.on('connect', resolve)
      cl.on('connect_error', reject)
      io.on('connection', socket => (sv = socket))
    })
  })
  afterEach(() => {
    cl.disconnect()
    io.removeAllListeners()
  })

  it('positive get all users', async () => {
    const r = await clSend(cl, 'user:getAll', '', '')
    expect(r).toEqual(respUsersAllFixture)
    expect(usersTable).toEqual(tableUsersAllFixture)
  })

  it('positive get user by id', async () => {
    const r = await clSend(cl, 'user:getById', 101, '')
    expect(r).toEqual(respUserByIdFixture)
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative get user by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:getById', 103, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(404)
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative get user by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:getById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })

  it('positive delete user by id', async () => {
    const r = await clSend(cl, 'user:removeById', 101, '')
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersWithoutDeletedFixture)
  })
  it('negative delete user by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:removeById', 103, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(404)
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative delete user by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:removeById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })

  it('positive post user', async () => {
    const r = await clSend(cl, 'user:add', '', dtoUserAddFixture)
    expect(r).toEqual(respUserAddedFixture)
    expect(usersTable).toEqual(tableUsersWithAddedFixture)
  })
  it('negative post user without necessary field', async () => {
    const { email, ...userDtoAddFixtureBad } = dtoUserAddFixture
    let r, e
    try {
      r = await clSend(cl, 'user:add', '', userDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({ _errors: [], email: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative post user with unnecessary field', async () => {
    const userDtoAddFixtureBad = { ...dtoUserAddFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'user:add', '', userDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative post user with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:add', '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })

  it('positive patch user by id', async () => {
    const r = await clSend(cl, 'user:updateById', 101, dtoUserUpdFixture)
    expect(r).toEqual(respUserUpdatedFixture)
    expect(usersTable).toEqual(tableUsersWithUpdatedFixture)
  })
  it('negative patch user by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', 103, dtoUserUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(404)
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative patch user by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', '', dtoUserUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative patch user by id without necessary field', async () => {
    const { money, ...userDtoUpdFixtureBad } = dtoUserUpdFixture
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', 101, userDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({ _errors: [], money: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative patch user by id with unnecessary field', async () => {
    const userDtoUpdFixtureBad = { ...dtoUserUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', 101, userDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative patch user by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', 101, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
})

////////////////////////////////////////////////////////////////////////////////

describe('client-role:user', () => {
  beforeEach(() => {
    return new Promise((resolve, reject) => {
      cl = ioc(url, { extraHeaders: { sessionid: 'fedcba' } })
      cl.on('connect', resolve)
      cl.on('connect_error', reject)
      io.on('connection', socket => (sv = socket))
    })
  })
  afterEach(() => {
    cl.disconnect()
    io.removeAllListeners()
  })

  it('positive get all users', async () => {
    const r = await clSend(cl, 'user:getAll', '', '')
    expect(r).toEqual(respUsersAllFixture)
    expect(usersTable).toEqual(tableUsersAllFixture)
  })

  it('positive get user by id', async () => {
    const r = await clSend(cl, 'user:getById', 101, '')
    expect(r).toEqual(respUserByIdFixture)
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative get user by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:getById', 103, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(404)
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative get user by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:getById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })

  it('negative delete user by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:removeById', 101, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative delete user by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:removeById', 103, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative delete user by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:removeById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })

  it('negative post user with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:add', '', dtoUserAddFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative post user without necessary field', async () => {
    const { email, ...userDtoAddFixtureBad } = dtoUserAddFixture
    let r, e
    try {
      r = await clSend(cl, 'user:add', '', userDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({ _errors: [], email: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative post user with unnecessary field', async () => {
    const userDtoAddFixtureBad = { ...dtoUserAddFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'user:add', '', userDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative post user with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:add', '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })

  it('negative patch user by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', 101, dtoUserUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative patch user by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', 103, dtoUserUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative patch user by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', '', dtoUserUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative patch user by id without necessary field', async () => {
    const { money, ...userDtoUpdFixtureBad } = dtoUserUpdFixture
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', 101, userDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({ _errors: [], money: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative patch user by id with unnecessary field', async () => {
    const userDtoUpdFixtureBad = { ...dtoUserUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', 101, userDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
  it('negative patch user by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'user:updateById', 101, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(usersTable).toEqual(tableUsersAllFixture)
  })
})

////////////////////////////////////////////////////////////////////////////////

describe('negative connect client-role:anon', () => {
  beforeEach(() => {})
  afterEach(() => {})

  it('without session cookie', async () => {
    const r = await new Promise<any>(resolve => {
      cl = ioc(url)
      cl.on('connect_error', resolve)
      io.on('connection', socket => (sv = socket))
    })
    expect(r.data.code).toBe(401)
    expect(r.message).toBe('unauthorized')
    cl.disconnect()
    io.removeAllListeners()
  })

  it('with bad session cookie', async () => {
    const r = await new Promise<any>(resolve => {
      cl = ioc(url, { extraHeaders: { sessionid: 'bad' } })
      cl.on('connect_error', resolve)
      io.on('connection', socket => (sv = socket))
    })
    expect(r.data.code).toBe(401)
    expect(r.message).toBe('unauthorized')
    cl.disconnect()
    io.removeAllListeners()
  })
})
