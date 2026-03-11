import supertest from 'supertest'
import appHttp from '../../../src/appHttp'
import carFixture from '../../fixtures/carFixture.js'
import carsFixture from '../../fixtures/carsFixture.js'

describe('GET /cars', () => {
  it('should status code is 200', async () => {
    const agent = supertest(appHttp)
    const response = await agent.get('/api/v0/cars')
    expect(response.status).toBe(200)
  })

  it('should headers has content-type json', async () => {
    const agent = supertest(appHttp)
    const response = await agent.get('/api/v0/cars')
    expect(response.headers['content-type']).toContain('application/json')
  })

  it('should headers has content-type utf-8', async () => {
    const agent = supertest(appHttp)
    const response = await agent.get('/api/v0/cars')
    expect(response.headers['content-type']).toContain('utf-8')
  })

  it('should headers cors enabled', async () => {
    const agent = supertest(appHttp)
    const response = await agent.get('/api/v0/cars')
    expect(response.headers['access-control-allow-origin']).toContain('*')
  })

  it('should headers cors allow credentials', async () => {
    const agent = supertest(appHttp)
    const response = await agent.get('/api/v0/cars')
    expect(response.headers['access-control-allow-credentials']).toBeTruthy()
  })

  it('should headers cors allow credentials', async () => {
    const agent = supertest(appHttp)
    const response = await agent.get('/api/v0/cars')
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  it('should headers cors allow credentials', async () => {
    const agent = supertest(appHttp)
    const response = await agent.get('/api/v0/cars')
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN')
  })

  it('should body is array', async () => {
    const agent = supertest(appHttp)
    const response = await agent.get('/api/v0/cars')
    expect(response.body).toBeInstanceOf(Array)
  })

  it('should body equals fixture', async () => {
    const agent = supertest(appHttp)
    const response = await agent.get('/api/v0/cars')
    expect(response.body).toEqual(carsFixture)
  })
})

// it('GET /cars/1001', async () => {
//   const response = await supertest(appHttp)
//     .get('/api/v0/cars/1001')
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .expect('Content-Type', /utf-8/)

//   expect(response.body).toEqual(carFixture)
// })
