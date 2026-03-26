import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo'
import respCarsAllFixture from '../fixtures/cars/respCarsAllFixture'
import respCarByIdFixture from '../fixtures/cars/respCarByIdFixture'
import tableCarsAllFixture from '../fixtures/cars/tableCarsAllFixture'
import carsTable from '../../src/utils/tables/carsTable'
import tableCarsWithoutDeletedFixture from '../fixtures/cars/tableCarsWithoutDeletedFixture'
import respCarAddedFixture from '../fixtures/cars/respCarAddedFixture'
import tableCarsWithAddedFixture from '../fixtures/cars/tableCarsWithAddedFixture'
import dtoCarAddFixture from '../fixtures/cars/dtoCarAddFixture'
import carsSeed from '../seeds/carsSeed'
import tableCarsWithUpdatedFixture from '../fixtures/cars/tableCarsWithUpdatedFixture'
import respCarUpdatedFixture from '../fixtures/cars/respCarUpdatedFixture'
import dtoCarUpdFixture from '../fixtures/cars/dtoCarUpdFixture'

const resetTable = () =>
  carsTable.splice(0, Infinity, ...structuredClone(carsSeed))

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

const port = 3333
const ns = '/cars'
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
    return new Promise(resolve => {
      cl = ioc(url, { extraHeaders: { sessionid: 'abcdef' } })
      cl.on('connect', resolve)
      io.on('connection', socket => (sv = socket))
    })
  })
  afterEach(() => {
    cl.disconnect()
    io.removeAllListeners()
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
    expect(e.code).toBe(404)
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(404)
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    const { brand, ...carDtoAddFixtureBad } = dtoCarAddFixture
    let r, e
    try {
      r = await clSend(cl, 'car:add', '', carDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({ _errors: [], brand: { _errors: ['Required'] } })
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(404)
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({ _errors: [], price: { _errors: ['Required'] } })
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
})

////////////////////////////////////////////////////////////////////////////////

describe('client-role:user', () => {
  beforeEach(() => {
    return new Promise(resolve => {
      cl = ioc(url, { extraHeaders: { sessionid: 'fedcba' } })
      cl.on('connect', resolve)
      io.on('connection', socket => (sv = socket))
    })
  })
  afterEach(() => {
    cl.disconnect()
    io.removeAllListeners()
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
    expect(e.code).toBe(404)
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(403)
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
    expect(e.code).toBe(403)
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
  })
  it('negative post car without necessary field', async () => {
    const { brand, ...carDtoAddFixtureBad } = dtoCarAddFixture
    let r, e
    try {
      r = await clSend(cl, 'car:add', '', carDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({ _errors: [], brand: { _errors: ['Required'] } })
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(403)
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
    expect(e.code).toBe(403)
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({ _errors: [], price: { _errors: ['Required'] } })
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
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
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(carsTable).toEqual(tableCarsAllFixture)
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
