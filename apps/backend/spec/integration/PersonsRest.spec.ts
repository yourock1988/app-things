import supertest from 'supertest'
import appHttp from '../../src/appHttp.js'
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
import { makeResetTable } from './helpers.js'

const resetTable = makeResetTable(personsTable, personsSeed)

beforeEach(() => {
  resetTable()
})

describe('Persons REST API', () => {
  let response
  afterEach(() => {
    // expect(response.headers['access-control-allow-origin']).toContain('*')
    expect(response.headers['access-control-allow-credentials']).toBeTruthy()
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  describe('GET /persons', () => {
    beforeAll(async () => {})
    it('positive get all persons', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/persons')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toEqual(respPersonsAllFixture)
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
  })

  describe('GET /persons/:id', () => {
    beforeAll(async () => {})
    it('positive get person by id', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/persons/101')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respPersonByIdFixture)
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative get person by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/persons/103')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
  })

  describe('DELETE /persons/:id', () => {
    beforeAll(async () => {})
    it('positive delete person by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/persons/101')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(204)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsWithoutDeletedFixture)
    })
    it('negative delete person by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/persons/103')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative delete person by id dont send cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/persons/101')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative delete person by id send cookie wrong sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/persons/101')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative delete person by id send cookie sessionId low perm', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/persons/101')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative delete person by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/persons/103')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative delete person by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/persons/103')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
  })

  describe('POST /persons', () => {
    it('positive post person', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/persons')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoPersonAddFixture)
      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respPersonAddedFixture)
      expect(personsTable).toEqual(tablePersonsWithAddedFixture)
    })
    it('negative post person without necessary field', async () => {
      const { email, ...personDtoAddFixtureBad } = dtoPersonAddFixture
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/persons')
        .set('cookie', 'sessionId=abcdef')
        .send(personDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        email: {
          _errors: ['Required'],
        },
      })
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative post person with unnecessary field', async () => {
      const personDtoAddFixtureBad = { ...dtoPersonAddFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/persons')
        .set('cookie', 'sessionId=abcdef')
        .send(personDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ["Unrecognized key(s) in object: 'foo'"],
      })
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative post person without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.post('/api/v0/persons').send(dtoPersonAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative post person with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/persons')
        .set('cookie', 'sessionId=xxx')
        .send(dtoPersonAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative post person with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/persons')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoPersonAddFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
  })

  describe('PATCH /persons/:id', () => {
    it('positive patch person by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/persons/101')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoPersonUpdFixture)
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respPersonUpdatedFixture)
      expect(personsTable).toEqual(tablePersonsWithUpdatedFixture)
    })
    it('negative patch person by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/persons/103')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoPersonUpdFixture)
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative patch person by id without necessary field', async () => {
      const { money, ...personDtoUpdFixtureBad } = dtoPersonUpdFixture
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/persons/101')
        .set('cookie', 'sessionId=abcdef')
        .send(personDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        money: {
          _errors: ['Required'],
        },
      })
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative patch person by id with unnecessary field', async () => {
      const personDtoUpdFixtureBad = { ...dtoPersonUpdFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/persons/101')
        .set('cookie', 'sessionId=abcdef')
        .send(personDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ["Unrecognized key(s) in object: 'foo'"],
      })
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative patch person by id without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/persons/101')
        .send(dtoPersonUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative patch person by id with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/persons/101')
        .set('cookie', 'sessionId=xxx')
        .send(dtoPersonUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative patch person by id with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/persons/101')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoPersonUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative patch person by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/persons/103')
        .send(dtoPersonUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
    it('negative patch person by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/persons/103')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoPersonUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(personsTable).toEqual(tablePersonsAllFixture)
    })
  })
})

let response

it('negative post person with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/persons')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Required'],
  })
  expect(personsTable).toEqual(tablePersonsAllFixture)
})
it('negative post person with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/persons')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Невалидный JSON: {,}'],
  })
  expect(personsTable).toEqual(tablePersonsAllFixture)
})

it('negative patch person by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/persons/101')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Required'],
  })
  expect(personsTable).toEqual(tablePersonsAllFixture)
})
it('negative patch person by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/persons/101')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Невалидный JSON: {,}'],
  })
  expect(personsTable).toEqual(tablePersonsAllFixture)
})
