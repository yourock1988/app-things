import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo.js'
// import carsTable from '../../src/utils/tables/carsTable.js'
import carsTable from '../../src/car/infra/carsTable.js'
import carsSeed from '../seeds/carsSeed.js'

import dtoCarAddFixture from '../fixtures/cars/dtoCarAddFixture.js'
import dtoCarUpdFixture from '../fixtures/cars/dtoCarUpdFixture.js'

import respCarAddedFixture from '../fixtures/cars/respCarAddedFixture.js'
import respCarByIdFixture from '../fixtures/cars/respCarByIdFixture.js'
import respCarUpdatedFixture from '../fixtures/cars/respCarUpdatedFixture.js'
import respCarsAllFixture from '../fixtures/cars/respCarsAllFixture.js'

import tableCarsAllFixture from '../fixtures/cars/tableCarsAllFixture.js'
import tableCarsWithAddedFixture from '../fixtures/cars/tableCarsWithAddedFixture.js'
import tableCarsWithoutDeletedFixture from '../fixtures/cars/tableCarsWithoutDeletedFixture.js'
import tableCarsWithUpdatedFixture from '../fixtures/cars/tableCarsWithUpdatedFixture.js'
import { makeResetTable, clSend } from './helpers.js'

const resetTable = makeResetTable(carsTable, carsSeed)
const port = 20011
const ns = '/cars'
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

  it('positive get all cars', async () => {
    const r = await clSend(cl, 'car:getAll', '', '')
    expect(r).toEqual(respCarsAllFixture)
    expect(carsTable).toEqual(tableCarsAllFixture)
  })

  it('positive get car by id', async () => {
    const r = await clSend(cl, 'car:getById', 1001, '')
    expect(r).toEqual(respCarByIdFixture)
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative get car by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:getById', 1003, '')
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative get car by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:getById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })

  it('positive delete car by id', async () => {
    const r = await clSend(cl, 'car:removeById', 1001, '')
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsWithoutDeletedFixture)
  })
  it('negative delete car by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:removeById', 1003, '')
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative delete car by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:removeById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })

  it('positive post car', async () => {
    const r = await clSend(cl, 'car:add', '', dtoCarAddFixture)
    expect(r).toEqual(respCarAddedFixture)
    expect(carsTable).toEqual(tableCarsWithAddedFixture)
  })
  it('negative post car without necessary field', async () => {
    const { price, ...carDtoAddFixtureBad } = dtoCarAddFixture
    let r, e
    try {
      r = await clSend(cl, 'car:add', '', carDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({ _errors: [], price: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative post car with unnecessary field', async () => {
    const carDtoAddFixtureBad = { ...dtoCarAddFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'car:add', '', carDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative post car with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:add', '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })

  it('positive patch car by id', async () => {
    const r = await clSend(cl, 'car:updateById', 1001, dtoCarUpdFixture)
    expect(r).toEqual(respCarUpdatedFixture)
    expect(carsTable).toEqual(tableCarsWithUpdatedFixture)
  })
  it('negative patch car by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', 1003, dtoCarUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative patch car by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', '', dtoCarUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative patch car by id without necessary field', async () => {
    const { price, ...carDtoUpdFixtureBad } = dtoCarUpdFixture
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', 1001, carDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({ _errors: [], price: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative patch car by id with unnecessary field', async () => {
    const carDtoUpdFixtureBad = { ...dtoCarUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', 1001, carDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative patch car by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', 1001, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
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

  it('positive get all cars', async () => {
    const r = await clSend(cl, 'car:getAll', '', '')
    expect(r).toEqual(respCarsAllFixture)
    expect(carsTable).toEqual(tableCarsAllFixture)
  })

  it('positive get car by id', async () => {
    const r = await clSend(cl, 'car:getById', 1001, '')
    expect(r).toEqual(respCarByIdFixture)
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative get car by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:getById', 1003, '')
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative get car by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:getById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })

  it('negative delete car by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:removeById', 1001, '')
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative delete car by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:removeById', 1003, '')
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative delete car by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:removeById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })

  it('negative post car with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:add', '', dtoCarAddFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative post car without necessary field', async () => {
    const { price, ...carDtoAddFixtureBad } = dtoCarAddFixture
    let r, e
    try {
      r = await clSend(cl, 'car:add', '', carDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({ _errors: [], price: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative post car with unnecessary field', async () => {
    const carDtoAddFixtureBad = { ...dtoCarAddFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'car:add', '', carDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative post car with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:add', '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })

  it('negative patch car by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', 1001, dtoCarUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative patch car by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', 1003, dtoCarUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative patch car by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', '', dtoCarUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative patch car by id without necessary field', async () => {
    const { price, ...carDtoUpdFixtureBad } = dtoCarUpdFixture
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', 1001, carDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({ _errors: [], price: { _errors: ['Required'] } })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative patch car by id with unnecessary field', async () => {
    const carDtoUpdFixtureBad = { ...dtoCarUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', 1001, carDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative patch car by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'car:updateById', 1001, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
})
