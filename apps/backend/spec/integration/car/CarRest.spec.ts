import supertest from 'supertest'
import appHttp from '../../../src/appHttp'
import carFixture from '../../fixtures/carFixture.js'
import carsFixture from '../../fixtures/carsFixture.js'

describe('GET /cars', () => {
  let response

  beforeAll(async () => {
    const agent = supertest(appHttp)
    response = await agent.get('/api/v0/cars')
  })

  it('should status code is 200', async () => {
    expect(response.status).toBe(200)
  })
  it('should headers has content-type json', async () => {
    expect(response.headers['content-type']).toContain('application/json')
  })
  it('should headers has content-type utf-8', async () => {
    expect(response.headers['content-type']).toContain('utf-8')
  })
  it('should cors enabled', async () => {
    expect(response.headers['access-control-allow-origin']).toContain('*')
  })
  it('should cors allow credentials', async () => {
    expect(response.headers['access-control-allow-credentials']).toBeTruthy()
  })
  it('should header x-powered-by removed', async () => {
    expect(response.headers['x-powered-by']).toBeUndefined()
  })
  it('should helmet middleware enabled', async () => {
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN')
  })
  it('should body is array', async () => {
    expect(response.body).toBeInstanceOf(Array)
  })
  it('should body equals fixture', async () => {
    expect(response.body).toEqual(carsFixture)
  })
})

describe('GET /cars/1001', () => {
  let response

  beforeAll(async () => {
    const agent = supertest(appHttp)
    response = await agent.get('/api/v0/cars/1001')
  })

  it('should status code is 200', async () => {
    expect(response.status).toBe(200)
  })
  it('should headers has content-type json', async () => {
    expect(response.headers['content-type']).toContain('application/json')
  })
  it('should headers has content-type utf-8', async () => {
    expect(response.headers['content-type']).toContain('utf-8')
  })
  it('should cors enabled', async () => {
    expect(response.headers['access-control-allow-origin']).toContain('*')
  })
  it('should cors allow credentials', async () => {
    expect(response.headers['access-control-allow-credentials']).toBeTruthy()
  })
  it('should header x-powered-by removed', async () => {
    expect(response.headers['x-powered-by']).toBeUndefined()
  })
  it('should helmet middleware enabled', async () => {
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN')
  })
  it('should body equals fixture', async () => {
    expect(response.body).toEqual(carFixture)
  })
})
