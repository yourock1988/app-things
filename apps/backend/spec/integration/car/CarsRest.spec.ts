import supertest from 'supertest'
import appHttp from '../../../src/appHttp'
import carFixture from '../../fixtures/cars/carFixture.js'
import carsFixture from '../../fixtures/cars/carsFixture.js'
import carsTable from '../../../src/utils/tables/carsTable.js'
import carsSeed from '../../seeds/carsSeed.js'
import carsWithUpdatedFixture from '../../fixtures/cars/carsWithUpdatedFixture.js'
import carsWithAddedFixture from '../../fixtures/cars/carsWithAddedFixture.js'
import carUpdatedFixture from '../../fixtures/cars/carUpdatedFixture.js'
import carAddedFixture from '../../fixtures/cars/carAddedFixture.js'
import carDtoUpdFixture from '../../fixtures/cars/carDtoUpdFixture.js'
import carDtoAddFixture from '../../fixtures/cars/carDtoAddFixture.js'

const resetTable = () => carsTable.splice(0, Infinity, ...carsSeed)
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
  })

  describe('DELETE /cars/:id', () => {
    beforeAll(async () => {})
    it('positive delete car by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/cars/1001')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(204)
      expect(response.body).toEqual({})
      expect(carsTable).not.toEqual(hasObjId(1001))
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
  })
})
