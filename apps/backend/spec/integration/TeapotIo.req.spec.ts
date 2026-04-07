import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo'
import teapotsTable from '../../src/utils/tables/teapotsTable'
import teapotsSeed from '../seeds/teapotsSeed'

import dtoTeapotAddFixture from '../fixtures/teapots/dtoTeapotAddFixture'
import dtoTeapotUpdFixture from '../fixtures/teapots/dtoTeapotUpdFixture'

import respTeapotAddedFixture from '../fixtures/teapots/respTeapotAddedFixture'
import respTeapotByIdFixture from '../fixtures/teapots/respTeapotByIdFixture'
import respTeapotUpdatedFixture from '../fixtures/teapots/respTeapotUpdatedFixture'
import respTeapotsAllFixture from '../fixtures/teapots/respTeapotsAllFixture'

import tableTeapotsAllFixture from '../fixtures/teapots/tableTeapotsAllFixture'
import tableTeapotsWithAddedFixture from '../fixtures/teapots/tableTeapotsWithAddedFixture'
import tableTeapotsWithoutDeletedFixture from '../fixtures/teapots/tableTeapotsWithoutDeletedFixture'
import tableTeapotsWithUpdatedFixture from '../fixtures/teapots/tableTeapotsWithUpdatedFixture'
import { makeResetTable, clSend } from './helpers'

const resetTable = makeResetTable(teapotsTable, teapotsSeed)
const port = 20031
const ns = '/teapots'
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

  it('positive get all teapots', async () => {
    const r = await clSend(cl, 'teapot:getAll', '', '')
    expect(r).toEqual(respTeapotsAllFixture)
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('positive get teapot by id', async () => {
    const r = await clSend(cl, 'teapot:getById', 4201, '')
    expect(r).toEqual(respTeapotByIdFixture)
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative get teapot by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:getById', 4203, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(404)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative get teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:getById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('positive delete teapot by id', async () => {
    const r = await clSend(cl, 'teapot:removeById', 4201, '')
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsWithoutDeletedFixture)
  })
  it('negative delete teapot by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:removeById', 4203, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(404)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative delete teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:removeById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('positive post teapot', async () => {
    const r = await clSend(cl, 'teapot:add', '', dtoTeapotAddFixture)
    expect(r).toEqual(respTeapotAddedFixture)
    expect(teapotsTable).toEqual(tableTeapotsWithAddedFixture)
  })
  it('negative post teapot without necessary field', async () => {
    const { temperature, ...teapotDtoAddFixtureBad } = dtoTeapotAddFixture
    let r, e
    try {
      r = await clSend(cl, 'teapot:add', '', teapotDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      temperature: { _errors: ['Required'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative post teapot with unnecessary field', async () => {
    const teapotDtoAddFixtureBad = { ...dtoTeapotAddFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'teapot:add', '', teapotDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative post teapot with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:add', '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('positive patch teapot by id', async () => {
    const r = await clSend(cl, 'teapot:updateById', 4201, dtoTeapotUpdFixture)
    expect(r).toEqual(respTeapotUpdatedFixture)
    expect(teapotsTable).toEqual(tableTeapotsWithUpdatedFixture)
  })
  it('negative patch teapot by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', 4203, dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(404)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', '', dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id without necessary field', async () => {
    const { ongoing, ...teapotDtoUpdFixtureBad } = dtoTeapotUpdFixture
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', 4201, teapotDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      ongoing: { _errors: ['Required'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with unnecessary field', async () => {
    const teapotDtoUpdFixtureBad = { ...dtoTeapotUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', 4201, teapotDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', 4201, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
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

  it('negative get all teapots with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:getAll', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('negative get teapot by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:getById', 4201, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative get teapot by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:getById', 4203, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative get teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:getById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('negative delete teapot by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:removeById', 4201, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative delete teapot by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:removeById', 4203, '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative delete teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:removeById', '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('negative post teapot with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:add', '', dtoTeapotAddFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative post teapot without necessary field', async () => {
    const { temperature, ...teapotDtoAddFixtureBad } = dtoTeapotAddFixture
    let r, e
    try {
      r = await clSend(cl, 'teapot:add', '', teapotDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      temperature: { _errors: ['Required'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative post teapot with unnecessary field', async () => {
    const teapotDtoAddFixtureBad = { ...dtoTeapotAddFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'teapot:add', '', teapotDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative post teapot with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:add', '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('negative patch teapot by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', 4201, dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', 4203, dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', '', dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id without necessary field', async () => {
    const { ongoing, ...teapotDtoUpdFixtureBad } = dtoTeapotUpdFixture
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', 4201, teapotDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: [],
      ongoing: { _errors: ['Required'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with unnecessary field', async () => {
    const teapotDtoUpdFixtureBad = { ...dtoTeapotUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', 4201, teapotDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, 'teapot:updateById', 4201, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e.code).toBe(400)
    expect(e.details).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
})
