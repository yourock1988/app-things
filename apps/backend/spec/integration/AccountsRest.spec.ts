import supertest from 'supertest'
import appHttp from '../../src/appHttp.js'
import accountsTable from '../../src/utils/tables/accountsTable.js'
import accountsSeed from '../seeds/accountsSeed.js'

import dtoAccountAddFixture from '../fixtures/accounts/dtoAccountAddFixture.js'
import dtoAccountUpdFixture from '../fixtures/accounts/dtoAccountUpdFixture.js'

import respAccountAddedFixture from '../fixtures/accounts/respAccountAddedFixture.js'
import respAccountByIdFixture from '../fixtures/accounts/respAccountByIdFixture.js'
import respAccountUpdatedFixture from '../fixtures/accounts/respAccountUpdatedFixture.js'
import respAccountsAllFixture from '../fixtures/accounts/respAccountsAllFixture.js'

import tableAccountsAllFixture from '../fixtures/accounts/tableAccountsAllFixture.js'
import tableAccountsWithAddedFixture from '../fixtures/accounts/tableAccountsWithAddedFixture.js'
import tableAccountsWithoutDeletedFixture from '../fixtures/accounts/tableAccountsWithoutDeletedFixture.js'
import tableAccountsWithUpdatedFixture from '../fixtures/accounts/tableAccountsWithUpdatedFixture.js'
import { makeResetTable } from './helpers.js'

const resetTable = makeResetTable(accountsTable, accountsSeed)

beforeEach(() => {
  resetTable()
})

describe('Accounts REST API', () => {
  let response
  afterEach(() => {
    // expect(response.headers['access-control-allow-origin']).toContain('*')
    expect(response.headers['access-control-allow-credentials']).toBeTruthy()
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  describe('GET /accounts', () => {
    beforeAll(async () => {})
    it('positive get all accounts', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/accounts')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toEqual(respAccountsAllFixture)
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative get all accounts without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/accounts')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative get all accounts with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/accounts')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative get all accounts with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/accounts')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
  })

  describe('GET /accounts/:id', () => {
    beforeAll(async () => {})
    it('positive get account by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/accounts/1')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respAccountByIdFixture)
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative get account by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/accounts/3')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative get account by id without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/accounts/1')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative get account by id with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/accounts/1')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative get account by id with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/accounts/1')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative get account by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/accounts/3')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative get account by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .get('/api/v0/accounts/3')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
  })

  describe('DELETE /accounts/:id', () => {
    beforeAll(async () => {})
    it('positive delete account by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/accounts/1')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(204)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsWithoutDeletedFixture)
    })
    it('negative delete account by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/accounts/3')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative delete account by id not send cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/accounts/1')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative delete account by id send cookie wrong sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/accounts/1')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative delete account by id send cookie sessionId low perm', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/accounts/1')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative delete account by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/accounts/3')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative delete account by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/accounts/3')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
  })

  describe('POST /accounts', () => {
    it('positive post account', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/accounts')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoAccountAddFixture)
      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respAccountAddedFixture)
      expect(accountsTable).toEqual(tableAccountsWithAddedFixture)
    })
    it('negative post account without necessary field', async () => {
      const { phone, ...accountDtoAddFixtureBad } = dtoAccountAddFixture
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/accounts')
        .set('cookie', 'sessionId=abcdef')
        .send(accountDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        phone: {
          _errors: ['Пришлите это поле'],
        },
      })
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative post account with unnecessary field', async () => {
      const accountDtoAddFixtureBad = { ...dtoAccountAddFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/accounts')
        .set('cookie', 'sessionId=abcdef')
        .send(accountDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ['Уберите лишние поля из запроса'],
      })
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative post account without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.post('/api/v0/accounts').send(dtoAccountAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative post account with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/accounts')
        .set('cookie', 'sessionId=xxx')
        .send(dtoAccountAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative post account with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/accounts')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoAccountAddFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
  })

  describe('PATCH /accounts/:id', () => {
    it('positive patch account by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/accounts/1')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoAccountUpdFixture)
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respAccountUpdatedFixture)
      expect(accountsTable).toEqual(tableAccountsWithUpdatedFixture)
    })
    it('negative patch account by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/accounts/3')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoAccountUpdFixture)
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative patch account by id without necessary field', async () => {
      const { password, ...accountDtoUpdFixtureBad } = dtoAccountUpdFixture
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/accounts/1')
        .set('cookie', 'sessionId=abcdef')
        .send(accountDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        password: {
          _errors: ['Пришлите это поле'],
        },
      })
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative patch account by id with unnecessary field', async () => {
      const accountDtoUpdFixtureBad = { ...dtoAccountUpdFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/accounts/1')
        .set('cookie', 'sessionId=abcdef')
        .send(accountDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ['Уберите лишние поля из запроса'],
      })
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative patch account by id without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/accounts/1')
        .send(dtoAccountUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative patch account by id with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/accounts/1')
        .set('cookie', 'sessionId=xxx')
        .send(dtoAccountUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative patch account by id with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/accounts/1')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoAccountUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative patch account by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/accounts/3')
        .send(dtoAccountUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
    it('negative patch account by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/accounts/3')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoAccountUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(accountsTable).toEqual(tableAccountsAllFixture)
    })
  })
})

let response

it('negative post account with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/accounts')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Пришлите объект в формате JSON'],
  })
  expect(accountsTable).toEqual(tableAccountsAllFixture)
})
it('negative post account with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/accounts')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')

  expect(response.body).toEqual({
    _errors: ['Невалидный JSON: {,}'],
  })
  expect(accountsTable).toEqual(tableAccountsAllFixture)
})

it('negative patch account by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/accounts/1')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Пришлите объект в формате JSON'],
  })
  expect(accountsTable).toEqual(tableAccountsAllFixture)
})
it('negative patch account by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/accounts/1')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Невалидный JSON: {,}'],
  })
  expect(accountsTable).toEqual(tableAccountsAllFixture)
})
