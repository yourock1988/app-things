import supertest from 'supertest'
import appHttp from '../../src/appHttp'
import carFixture from '../fixtures/cars/carFixture.js'
import carsFixture from '../fixtures/cars/carsFixture.js'
import carsTable from '../../src/utils/tables/carsTable.js'
import carsSeed from '../seeds/carsSeed.js'
import carsWithUpdatedFixture from '../fixtures/cars/carsWithUpdatedFixture.js'
import carsWithAddedFixture from '../fixtures/cars/carsWithAddedFixture.js'
import carUpdatedFixture from '../fixtures/cars/carUpdatedFixture.js'
import carAddedFixture from '../fixtures/cars/carAddedFixture.js'
import carDtoUpdFixture from '../fixtures/cars/carDtoUpdFixture.js'
import carDtoAddFixture from '../fixtures/cars/carDtoAddFixture.js'

const resetTable = () =>
  carsTable.splice(0, Infinity, ...structuredClone(carsSeed))
const hasObjId = id => expect.arrayContaining([expect.objectContaining({ id })])

describe('Cars REST API', () => {
  let response
  beforeEach(() => {
    resetTable()
  })
  afterEach(() => {
    expect(response.headers['access-control-allow-origin']).toContain('*')
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
      expect(response.body).toEqual(carsFixture)
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
      expect(response.body).toEqual(carFixture)
    })
    it('negative get car by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/cars/1003')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
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
      expect(carsTable).not.toEqual(hasObjId(1001))
    })
    it('negative delete car by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1003')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).not.toEqual(hasObjId(1003))
    })
    it('negative delete car by id dont send cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/cars/1001')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(hasObjId(1001))
    })
    it('negative delete car by id send cookie wrong sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1001')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(hasObjId(1001))
    })
    it('negative delete car by id send cookie sessionId low perm', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1001')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(hasObjId(1001))
    })
    it('negative delete car by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/cars/1003')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).not.toEqual(hasObjId(1003))
    })
    it('negative delete car by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1003')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).not.toEqual(hasObjId(1003))
    })
  })

  describe('POST /cars', () => {
    it('positive post car', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/cars')
        .set('cookie', 'sessionId=abcdef')
        .send(carDtoAddFixture)
      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(carAddedFixture)
      expect(carsTable).toEqual(carsWithAddedFixture)
    })
    it('negative post car without necessary field', async () => {
      const { brand, ...carDtoAddFixtureBad } = carDtoAddFixture
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
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative post car with unnecessary field', async () => {
      const carDtoAddFixtureBad = { ...carDtoAddFixture, foo: 'bar' }
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
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative post car without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.post('/api/v0/cars').send(carDtoAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative post car with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/cars')
        .set('cookie', 'sessionId=xxx')
        .send(carDtoAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative post car with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/cars')
        .set('cookie', 'sessionId=fedcba')
        .send(carDtoAddFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(carsFixture)
    })
  })

  describe('PATCH /cars/:id', () => {
    it('positive patch car by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1001')
        .set('cookie', 'sessionId=abcdef')
        .send(carDtoUpdFixture)
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(carUpdatedFixture)
      expect(carsTable).toEqual(carsWithUpdatedFixture)
    })
    it('negative patch car by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1003')
        .set('cookie', 'sessionId=abcdef')
        .send(carDtoUpdFixture)
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative patch car by id without necessary field', async () => {
      const { price, ...carDtoUpdFixtureBad } = carDtoUpdFixture
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
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative patch car by id with unnecessary field', async () => {
      const carDtoUpdFixtureBad = { ...carDtoUpdFixture, foo: 'bar' }
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
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative patch car by id without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.patch('/api/v0/cars/1001').send(carDtoUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative patch car by id with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1001')
        .set('cookie', 'sessionId=xxx')
        .send(carDtoUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative patch car by id with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1001')
        .set('cookie', 'sessionId=fedcba')
        .send(carDtoUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative patch car by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.patch('/api/v0/cars/1003').send(carDtoUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(carsFixture)
    })
    it('negative patch car by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/cars/1003')
        .set('cookie', 'sessionId=fedcba')
        .send(carDtoUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(carsTable).toEqual(carsFixture)
    })
  })
})
