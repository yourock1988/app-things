import supertest from 'supertest'
import appHttp from '../../src/appHttp'
import teapotsTable from '../../src/utils/tables/teapotsTable.js'
import teapotsSeed from '../seeds/teapotsSeed.js'

import dtoTeapotAddFixture from '../fixtures/teapots/dtoTeapotAddFixture.js'
import dtoTeapotUpdFixture from '../fixtures/teapots/dtoTeapotUpdFixture.js'

import respTeapotAddedFixture from '../fixtures/teapots/respTeapotAddedFixture.js'
import respTeapotByIdFixture from '../fixtures/teapots/respTeapotByIdFixture.js'
import respTeapotUpdatedFixture from '../fixtures/teapots/respTeapotUpdatedFixture.js'
import respTeapotsAllFixture from '../fixtures/teapots/respTeapotsAllFixture'

import tableTeapotsAllFixture from '../fixtures/teapots/tableTeapotsAllFixture.js'
import tableTeapotsWithAddedFixture from '../fixtures/teapots/tableTeapotsWithAddedFixture.js'
import tableTeapotsWithoutDeletedFixture from '../fixtures/teapots/tableTeapotsWithoutDeletedFixture.js'
import tableTeapotsWithUpdatedFixture from '../fixtures/teapots/tableTeapotsWithUpdatedFixture.js'
import { makeResetTable } from './helpers'

const resetTable = makeResetTable(teapotsTable, teapotsSeed)

beforeEach(() => {
  resetTable()
})

describe('Teapots REST API', () => {
  let response
  afterEach(() => {
    // expect(response.headers['access-control-allow-origin']).toContain('*')
    expect(response.headers['access-control-allow-credentials']).toBeTruthy()
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  describe('GET /teapots', () => {
    beforeAll(async () => {})
    it('positive get all teapots', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/teapots')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toEqual(respTeapotsAllFixture)
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
  })

  describe('GET /teapots/:id', () => {
    beforeAll(async () => {})
    it('positive get teapot by id', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/teapots/4201')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respTeapotByIdFixture)
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative get teapot by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/teapots/4203')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
  })

  describe('DELETE /teapots/:id', () => {
    beforeAll(async () => {})
    it('positive delete teapot by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/teapots/4201')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(204)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsWithoutDeletedFixture)
    })
    it('negative delete teapot by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/teapots/4203')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative delete teapot by id dont send cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/teapots/4201')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative delete teapot by id send cookie wrong sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/teapots/4201')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative delete teapot by id send cookie sessionId low perm', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/teapots/4201')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative delete teapot by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/teapots/4203')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative delete teapot by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/teapots/4203')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
  })

  describe('POST /teapots', () => {
    it('positive post teapot', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/teapots')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoTeapotAddFixture)
      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respTeapotAddedFixture)
      expect(teapotsTable).toEqual(tableTeapotsWithAddedFixture)
    })
    it('negative post teapot without necessary field', async () => {
      const { temperature, ...teapotDtoAddFixtureBad } = dtoTeapotAddFixture
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/teapots')
        .set('cookie', 'sessionId=abcdef')
        .send(teapotDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        temperature: {
          _errors: ['Required'],
        },
      })
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative post teapot with unnecessary field', async () => {
      const teapotDtoAddFixtureBad = { ...dtoTeapotAddFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/teapots')
        .set('cookie', 'sessionId=abcdef')
        .send(teapotDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ["Unrecognized key(s) in object: 'foo'"],
      })
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative post teapot without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.post('/api/v0/teapots').send(dtoTeapotAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative post teapot with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/teapots')
        .set('cookie', 'sessionId=xxx')
        .send(dtoTeapotAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative post teapot with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/teapots')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoTeapotAddFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
  })

  describe('PATCH /teapots/:id', () => {
    it('positive patch teapot by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/teapots/4201')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoTeapotUpdFixture)
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respTeapotUpdatedFixture)
      expect(teapotsTable).toEqual(tableTeapotsWithUpdatedFixture)
    })
    it('negative patch teapot by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/teapots/4203')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoTeapotUpdFixture)
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative patch teapot by id without necessary field', async () => {
      const { temperature, ...teapotDtoUpdFixtureBad } = dtoTeapotUpdFixture
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/teapots/4201')
        .set('cookie', 'sessionId=abcdef')
        .send(teapotDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        temperature: {
          _errors: ['Required'],
        },
      })
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative patch teapot by id with unnecessary field', async () => {
      const teapotDtoUpdFixtureBad = { ...dtoTeapotUpdFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/teapots/4201')
        .set('cookie', 'sessionId=abcdef')
        .send(teapotDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ["Unrecognized key(s) in object: 'foo'"],
      })
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative patch teapot by id without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/teapots/101')
        .send(dtoTeapotUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative patch teapot by id with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/teapots/4201')
        .set('cookie', 'sessionId=xxx')
        .send(dtoTeapotUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative patch teapot by id with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/teapots/4201')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoTeapotUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative patch teapot by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/teapots/4203')
        .send(dtoTeapotUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
    it('negative patch teapot by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/teapots/4203')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoTeapotUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(teapotsTable).toEqual(tableTeapotsAllFixture)
    })
  })
})

let response

it('negative post teapot with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/teapots')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Required'],
  })
  expect(teapotsTable).toEqual(tableTeapotsAllFixture)
})
it('negative post teapot with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/teapots')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    message: 'Невалидный JSON: {,}',
  })
  expect(teapotsTable).toEqual(tableTeapotsAllFixture)
})

it('negative patch teapot by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/teapots/4201')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Required'],
  })
  expect(teapotsTable).toEqual(tableTeapotsAllFixture)
})
it('negative patch teapot by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/teapots/4201')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    message: 'Невалидный JSON: {,}',
  })
  expect(teapotsTable).toEqual(tableTeapotsAllFixture)
})
