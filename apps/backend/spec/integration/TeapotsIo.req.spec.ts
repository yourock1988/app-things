import { TEAPOT } from '@app-x/cmd'
import { io as ioc } from 'socket.io-client'
import io from '../../src/appIo.js'
// import teapotsTable from '../../src/utils/tables/teapotsTable.js'
import teapotsTable from '../../src/teapot/infra/teapotsTable.js'
import teapotsSeed from '../seeds/teapotsSeed.js'

import dtoTeapotAddFixture from '../fixtures/teapots/dtoTeapotAddFixture.js'
import dtoTeapotUpdFixture from '../fixtures/teapots/dtoTeapotUpdFixture.js'

import respTeapotAddedFixture from '../fixtures/teapots/respTeapotAddedFixture.js'
import respTeapotByIdFixture from '../fixtures/teapots/respTeapotByIdFixture.js'
import respTeapotUpdatedFixture from '../fixtures/teapots/respTeapotUpdatedFixture.js'
import respTeapotsAllFixture from '../fixtures/teapots/respTeapotsAllFixture.js'

import tableTeapotsAllFixture from '../fixtures/teapots/tableTeapotsAllFixture.js'
import tableTeapotsWithAddedFixture from '../fixtures/teapots/tableTeapotsWithAddedFixture.js'
import tableTeapotsWithoutDeletedFixture from '../fixtures/teapots/tableTeapotsWithoutDeletedFixture.js'
import tableTeapotsWithUpdatedFixture from '../fixtures/teapots/tableTeapotsWithUpdatedFixture.js'
import { makeResetTable, clSend } from './helpers.js'

const { CL } = TEAPOT

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
    const r = await clSend(cl, CL.GET_ALL, '', '')
    expect(r).toEqual(respTeapotsAllFixture)
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('positive get teapot by id', async () => {
    const r = await clSend(cl, CL.GET_BY_ID, 4201, '')
    expect(r).toEqual(respTeapotByIdFixture)
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative get teapot by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.GET_BY_ID, 4203, '')
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative get teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.GET_BY_ID, '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('positive delete teapot by id', async () => {
    const r = await clSend(cl, CL.DEL_BY_ID, 4201, '')
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsWithoutDeletedFixture)
  })
  it('negative delete teapot by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.DEL_BY_ID, 4203, '')
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative delete teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.DEL_BY_ID, '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('positive post teapot', async () => {
    const r = await clSend(cl, CL.ADD, '', dtoTeapotAddFixture)
    expect(r).toEqual(respTeapotAddedFixture)
    expect(teapotsTable).toEqual(tableTeapotsWithAddedFixture)
  })
  it('negative post teapot without necessary field', async () => {
    const { temperature, ...teapotDtoAddFixtureBad } = dtoTeapotAddFixture
    let r, e
    try {
      r = await clSend(cl, CL.ADD, '', teapotDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
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
      r = await clSend(cl, CL.ADD, '', teapotDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative post teapot with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.ADD, '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('positive patch teapot by id', async () => {
    const r = await clSend(cl, CL.UPD_BY_ID, 4201, dtoTeapotUpdFixture)
    expect(r).toEqual(respTeapotUpdatedFixture)
    expect(teapotsTable).toEqual(tableTeapotsWithUpdatedFixture)
  })
  it('negative patch teapot by id that not exists', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, 4203, dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e).toBe(404)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, '', dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id without necessary field', async () => {
    const { temperature, ...teapotDtoUpdFixtureBad } = dtoTeapotUpdFixture
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, 4201, teapotDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      temperature: { _errors: ['Required'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with unnecessary field', async () => {
    const teapotDtoUpdFixtureBad = { ...dtoTeapotUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, 4201, teapotDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, 4201, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
})

////////////////////////////////////////////////////////////////////////////////

describe('client-role:guest', () => {
  beforeEach(() => {
    return new Promise((resolve, reject) => {
      cl = ioc(url, { extraHeaders: { sessionid: 'ffffff' } })
      cl.on('connect', resolve)
      cl.on('connect_error', reject)
    })
  })

  it('negative get all teapots with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.GET_ALL, '', '')
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('negative get teapot by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.GET_BY_ID, 4201, '')
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative get teapot by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.GET_BY_ID, 4203, '')
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative get teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.GET_BY_ID, '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('negative delete teapot by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.DEL_BY_ID, 4201, '')
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative delete teapot by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.DEL_BY_ID, 4203, '')
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative delete teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.DEL_BY_ID, '', '')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('negative post teapot with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.ADD, '', dtoTeapotAddFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative post teapot without necessary field', async () => {
    const { temperature, ...teapotDtoAddFixtureBad } = dtoTeapotAddFixture
    let r, e
    try {
      r = await clSend(cl, CL.ADD, '', teapotDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
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
      r = await clSend(cl, CL.ADD, '', teapotDtoAddFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative post teapot with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.ADD, '', '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })

  it('negative patch teapot by id with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, 4201, dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id that not exists with low perm', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, 4203, dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e.data).toBe(403)
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with invalid id', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, '', dtoTeapotUpdFixture)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      id: { _errors: ['Пришлите корректный ID'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id without necessary field', async () => {
    const { temperature, ...teapotDtoUpdFixtureBad } = dtoTeapotUpdFixture
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, 4201, teapotDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: [],
      temperature: { _errors: ['Required'] },
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with unnecessary field', async () => {
    const teapotDtoUpdFixtureBad = { ...dtoTeapotUpdFixture, foo: 'bar' }
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, 4201, teapotDtoUpdFixtureBad)
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ["Unrecognized key(s) in object: 'foo'"],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
  it('negative patch teapot by id with invalid json', async () => {
    let r, e
    try {
      r = await clSend(cl, CL.UPD_BY_ID, 4201, '{,}')
    } catch (err: any) {
      e = err
    }
    expect(e).toEqual({
      _errors: ['Expected object, received string'],
    })
    expect(r).toBeUndefined()
    expect(teapotsTable).toEqual(tableTeapotsAllFixture)
  })
})
