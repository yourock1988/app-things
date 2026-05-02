import supertest from 'supertest'
import appHttp from '../../src/appHttp.js'
// import sessionsTable from '../../src/utils/tables/sessionsTable.js'
import sessionsTable from '../../src/session/infra/sessionsTable.js'
import sessionsSeed from '../seeds/sessionsSeed.js'

import dtoSessionAddFixture from '../fixtures/sessions/dtoSessionAddFixture.js'
import dtoSessionUpdFixture from '../fixtures/sessions/dtoSessionUpdFixture.js'

import respSessionAddedFixture from '../fixtures/sessions/respSessionAddedFixture.js'
import respSessionByIdFixture from '../fixtures/sessions/respSessionByIdFixture.js'
import respSessionUpdatedFixture from '../fixtures/sessions/respSessionUpdatedFixture.js'
import respSessionsAllFixture from '../fixtures/sessions/respSessionsAllFixture.js'

import tableSessionsAllFixture from '../fixtures/sessions/tableSessionsAllFixture.js'
import tableSessionsWithAddedFixture from '../fixtures/sessions/tableSessionsWithAddedFixture.js'
import tableSessionsWithoutDeletedFixture from '../fixtures/sessions/tableSessionsWithoutDeletedFixture.js'
import tableSessionsWithUpdatedFixture from '../fixtures/sessions/tableSessionsWithUpdatedFixture.js'
import { makeResetTable } from './helpers.js'

const resetTable = makeResetTable(sessionsTable, sessionsSeed)

beforeEach(() => {
  resetTable()
})

describe('Sessions REST API', () => {
  let response
  afterEach(() => {
    // expect(response.headers['access-control-allow-origin']).toContain('*')
    expect(response.headers['access-control-allow-credentials']).toBeTruthy()
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  describe('GET /sessions', () => {
    beforeAll(async () => {})
    it('positive get all sessions', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/sessions')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toEqual(respSessionsAllFixture)
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative get all sessions without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/sessions')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative get all sessions with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/sessions')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative get all sessions with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/sessions')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
  })

  describe('GET /sessions/:id', () => {
    beforeAll(async () => {})
    it('positive get session by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/sessions/11')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respSessionByIdFixture)
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative get session by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/sessions/13')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative get session by id without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/sessions/11')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative get session by id with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/sessions/11')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative get session by id with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/sessions/11')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative get session by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/sessions/13')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative get session by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/sessions/13')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
  })

  describe('DELETE /sessions/:id', () => {
    beforeAll(async () => {})
    it('positive delete session by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/sessions/11')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(204)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsWithoutDeletedFixture)
    })
    it('negative delete session by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/sessions/13')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative delete session by id dont send cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/sessions/11')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative delete session by id send cookie wrong sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/sessions/11')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative delete session by id send cookie sessionId low perm', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/sessions/11')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative delete session by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/sessions/13')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative delete session by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/sessions/13')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
  })

  describe('POST /sessions', () => {
    it('positive post session', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/sessions')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoSessionAddFixture)
      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respSessionAddedFixture)
      expect(sessionsTable).toEqual(tableSessionsWithAddedFixture)
    })
    it('negative post session without necessary field', async () => {
      const { nickname, ...sessionDtoAddFixtureBad } = dtoSessionAddFixture
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/sessions')
        .set('cookie', 'sessionId=abcdef')
        .send(sessionDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        nickname: {
          _errors: ['Пришлите это поле'],
        },
      })
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative post session with unnecessary field', async () => {
      const sessionDtoAddFixtureBad = { ...dtoSessionAddFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/sessions')
        .set('cookie', 'sessionId=abcdef')
        .send(sessionDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ['Уберите лишние поля из запроса'],
      })
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative post session without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.post('/api/v0/sessions').send(dtoSessionAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative post session with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/sessions')
        .set('cookie', 'sessionId=xxx')
        .send(dtoSessionAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative post session with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/sessions')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoSessionAddFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
  })

  describe('PATCH /sessions/:id', () => {
    it('positive patch session by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/sessions/11')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoSessionUpdFixture)
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respSessionUpdatedFixture)
      expect(sessionsTable).toEqual(tableSessionsWithUpdatedFixture)
    })
    it('negative patch session by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/sessions/13')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoSessionUpdFixture)
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative patch session by id without necessary field', async () => {
      const { nickname, ...sessionDtoUpdFixtureBad } = dtoSessionUpdFixture
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/sessions/11')
        .set('cookie', 'sessionId=abcdef')
        .send(sessionDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        nickname: {
          _errors: ['Пришлите это поле'],
        },
      })
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative patch session by id with unnecessary field', async () => {
      const sessionDtoUpdFixtureBad = { ...dtoSessionUpdFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/sessions/11')
        .set('cookie', 'sessionId=abcdef')
        .send(sessionDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ['Уберите лишние поля из запроса'],
      })
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative patch session by id without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/sessions/11')
        .send(dtoSessionUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative patch session by id with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/sessions/11')
        .set('cookie', 'sessionId=xxx')
        .send(dtoSessionUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative patch session by id with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/sessions/11')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoSessionUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative patch session by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/sessions/13')
        .send(dtoSessionUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
    it('negative patch session by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/sessions/13')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoSessionUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(sessionsTable).toEqual(tableSessionsAllFixture)
    })
  })
})

let response

it('negative post session with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/sessions')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Пришлите объект в формате JSON'],
  })
  expect(sessionsTable).toEqual(tableSessionsAllFixture)
})
it('negative post session with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/sessions')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Невалидный JSON: {,}'],
  })
  expect(sessionsTable).toEqual(tableSessionsAllFixture)
})

it('negative patch session by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/sessions/11')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Пришлите объект в формате JSON'],
  })
  expect(sessionsTable).toEqual(tableSessionsAllFixture)
})
it('negative patch session by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/sessions/11')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Невалидный JSON: {,}'],
  })
  expect(sessionsTable).toEqual(tableSessionsAllFixture)
})
