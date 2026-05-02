import supertest from 'supertest'
import appHttp from '../../src/appHttp.js'
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
import { makeResetTable } from './helpers.js'

const resetTable = makeResetTable(carsTable, carsSeed)

beforeEach(() => {
  resetTable()
})

describe('Cars REST API', () => {
  let response
  afterEach(() => {
    // expect(response.headers['access-control-allow-origin']).toContain('*')
    expect(response.headers['access-control-allow-credentials']).toBeTruthy()
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  describe('GET /cars', () => {
    beforeAll(async () => {})
    it('positive get all cars', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/cars')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toEqual(respCarsAllFixture)
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
  })

  describe('GET /cars/:id', () => {
    beforeAll(async () => {})
    it('positive get car by id', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/cars/1001')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respCarByIdFixture)
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative get car by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/cars/1003')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
  })

  describe('DELETE /cars/:id', () => {
    beforeAll(async () => {})
    it('positive delete car by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1001')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(204)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsWithoutDeletedFixture)
    })
    it('negative delete car by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1003')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative delete car by id dont send cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/cars/1001')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative delete car by id send cookie wrong sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1001')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative delete car by id send cookie sessionId low perm', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1001')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative delete car by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/cars/1003')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative delete car by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1003')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
  })

  describe('POST /cars', () => {
    it('positive post car', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/cars')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoCarAddFixture)
      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respCarAddedFixture)
      expect(carsTable).toEqual(tableCarsWithAddedFixture)
    })
    it('negative post car without necessary field', async () => {
      const { brand, ...carDtoAddFixtureBad } = dtoCarAddFixture
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/cars')
        .set('cookie', 'sessionId=abcdef')
        .send(carDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        brand: {
          _errors: ['Required'],
        },
      })
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative post car with unnecessary field', async () => {
      const carDtoAddFixtureBad = { ...dtoCarAddFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/cars')
        .set('cookie', 'sessionId=abcdef')
        .send(carDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ["Unrecognized key(s) in object: 'foo'"],
      })
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative post car without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.post('/api/v0/cars').send(dtoCarAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative post car with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/cars')
        .set('cookie', 'sessionId=xxx')
        .send(dtoCarAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative post car with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/cars')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoCarAddFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
  })

  describe('PATCH /cars/:id', () => {
    it('positive patch car by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1001')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoCarUpdFixture)
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respCarUpdatedFixture)
      expect(carsTable).toEqual(tableCarsWithUpdatedFixture)
    })
    it('negative patch car by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1003')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoCarUpdFixture)
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative patch car by id without necessary field', async () => {
      const { price, ...carDtoUpdFixtureBad } = dtoCarUpdFixture
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1001')
        .set('cookie', 'sessionId=abcdef')
        .send(carDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        price: {
          _errors: ['Required'],
        },
      })
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative patch car by id with unnecessary field', async () => {
      const carDtoUpdFixtureBad = { ...dtoCarUpdFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1001')
        .set('cookie', 'sessionId=abcdef')
        .send(carDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ["Unrecognized key(s) in object: 'foo'"],
      })
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative patch car by id without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.patch('/api/v0/cars/101').send(dtoCarUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative patch car by id with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1001')
        .set('cookie', 'sessionId=xxx')
        .send(dtoCarUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative patch car by id with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1001')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoCarUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative patch car by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.patch('/api/v0/cars/1003').send(dtoCarUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
    it('negative patch car by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1003')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoCarUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(tableCarsAllFixture)
    })
  })
})

let response

it('negative post car with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/cars')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Required'],
  })
  expect(carsTable).toEqual(tableCarsAllFixture)
})
it('negative post car with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .post('/api/v0/cars')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Невалидный JSON: {,}'],
  })
  expect(carsTable).toEqual(tableCarsAllFixture)
})

it('negative patch car by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/cars/1001')
    .set('cookie', 'sessionId=abcdef')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Required'],
  })
  expect(carsTable).toEqual(tableCarsAllFixture)
})
it('negative patch car by id with invalid json', async () => {
  const agent = supertest(appHttp)
  response = await agent
    .patch('/api/v0/cars/1001')
    .set('cookie', 'sessionId=abcdef')
    .set('content-type', 'application/json')
    .send('{,}')
  expect(response.status).toBe(400)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.headers['content-type']).toContain('utf-8')
  expect(response.body).toEqual({
    _errors: ['Невалидный JSON: {,}'],
  })
  expect(carsTable).toEqual(tableCarsAllFixture)
})
