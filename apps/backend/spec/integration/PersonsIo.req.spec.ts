import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo.js'
// import personsTable from '../../src/utils/tables/personsTable.js'
import personsTable from '../../src/person/infra/personsTable.js'
import personsSeed from '../seeds/personsSeed.js'

import dtoPersonAddFixture from '../fixtures/persons/dtoPersonAddFixture.js'
import dtoPersonUpdFixture from '../fixtures/persons/dtoPersonUpdFixture.js'

import respPersonAddedFixture from '../fixtures/persons/respPersonAddedFixture.js'
import respPersonByIdFixture from '../fixtures/persons/respPersonByIdFixture.js'
import respPersonUpdatedFixture from '../fixtures/persons/respPersonUpdatedFixture.js'
import respPersonsAllFixture from '../fixtures/persons/respPersonsAllFixture.js'

import tablePersonsAllFixture from '../fixtures/persons/tablePersonsAllFixture.js'
import tablePersonsWithAddedFixture from '../fixtures/persons/tablePersonsWithAddedFixture.js'
import tablePersonsWithoutDeletedFixture from '../fixtures/persons/tablePersonsWithoutDeletedFixture.js'
import tablePersonsWithUpdatedFixture from '../fixtures/persons/tablePersonsWithUpdatedFixture.js'
import { makeResetTable, clSend } from './helpers.js'

const resetTable = makeResetTable(personsTable, personsSeed)
const port = 20021
const ns = '/persons'
const url = `http://localhost:${port}${ns}`
let cl

beforeAll(() => {
  io.listen(port)
})
afterAll(() => {
  io.close()
})
beforeEach(() => {
  resetTable()
})
afterEach(() => {
  cl.disconnect()
})

describe('client-role:admin', () => {
  beforeEach(() => {
    return new Promise((resolve, reject) => {
      cl = ioc(url, { extraHeaders: { sessionid: 'abcdef' } })
      cl.on('connect', resolve)
      cl.on('connect_error', reject)
    })
  })

  it('positive get all persons', async () => {
    const r = await clSend(cl, 'person:getAll', '', '')
    expect(r).toEqual(respPersonsAllFixture)
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })

  it('positive get person by id', async () => {
    const r = await clSend(cl, 'person:getById', 101, '')
    expect(r).toEqual(respPersonByIdFixture)
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative get person by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:getById', 103, '')
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative get person by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:getById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })

  it('positive delete person by id', async () => {
    const r = await clSend(cl, 'person:removeById', 101, '')
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsWithoutDeletedFixture)
  })
  it('negative delete person by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:removeById', 103, '')
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative delete person by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:removeById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })

  it('positive post person', async () => {
    const r = await clSend(cl, 'person:add', '', dtoPersonAddFixture)
    expect(r).toEqual(respPersonAddedFixture)
    expect(personsTable).toEqual(tablePersonsWithAddedFixture)
  })
  it('negative post person without necessary field', async () => {
    const { email, ...personDtoAddFixtureBad } = dtoPersonAddFixture
    let r, e
    try {
      r = await clSend(cl, 'person:add', '', personDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({ _errors: [], email: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative post person with unnecessary field', async () => {
    const personDtoAddFixtureBad = { ...dtoPersonAddFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'person:add', '', personDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative post person with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:add', '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })

  it('positive patch person by id', async () => {
    const r = await clSend(cl, 'person:updateById', 101, dtoPersonUpdFixture)
    expect(r).toEqual(respPersonUpdatedFixture)
    expect(personsTable).toEqual(tablePersonsWithUpdatedFixture)
  })
  it('negative patch person by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', 103, dtoPersonUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative patch person by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', '', dtoPersonUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative patch person by id without necessary field', async () => {
    const { money, ...personDtoUpdFixtureBad } = dtoPersonUpdFixture
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', 101, personDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({ _errors: [], money: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative patch person by id with unnecessary field', async () => {
    const personDtoUpdFixtureBad = { ...dtoPersonUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', 101, personDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative patch person by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', 101, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
})

////////////////////////////////////////////////////////////////////////////////

describe('client-role:user', () => {
  beforeEach(() => {
    return new Promise((resolve, reject) => {
      cl = ioc(url, { extraHeaders: { sessionid: 'fedcba' } })
      cl.on('connect', resolve)
      cl.on('connect_error', reject)
    })
  })

  it('positive get all persons', async () => {
    const r = await clSend(cl, 'person:getAll', '', '')
    expect(r).toEqual(respPersonsAllFixture)
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })

  it('positive get person by id', async () => {
    const r = await clSend(cl, 'person:getById', 101, '')
    expect(r).toEqual(respPersonByIdFixture)
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative get person by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:getById', 103, '')
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative get person by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:getById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })

  it('negative delete person by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:removeById', 101, '')
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative delete person by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:removeById', 103, '')
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative delete person by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:removeById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })

  it('negative post person with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:add', '', dtoPersonAddFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative post person without necessary field', async () => {
    const { email, ...personDtoAddFixtureBad } = dtoPersonAddFixture
    let r, e
    try {
      r = await clSend(cl, 'person:add', '', personDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({ _errors: [], email: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative post person with unnecessary field', async () => {
    const personDtoAddFixtureBad = { ...dtoPersonAddFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'person:add', '', personDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative post person with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:add', '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })

  it('negative patch person by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', 101, dtoPersonUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative patch person by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', 103, dtoPersonUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative patch person by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', '', dtoPersonUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative patch person by id without necessary field', async () => {
    const { money, ...personDtoUpdFixtureBad } = dtoPersonUpdFixture
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', 101, personDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({ _errors: [], money: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative patch person by id with unnecessary field', async () => {
    const personDtoUpdFixtureBad = { ...dtoPersonUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', 101, personDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
  it('negative patch person by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'person:updateById', 101, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(personsTable).toEqual(tablePersonsAllFixture)
  })
})
