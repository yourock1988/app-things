import supertest from 'supertest'
import appHttp from '../../../src/appHttp'
import usersTable from '../../../src/utils/tables/usersTable.js'
import usersSeed from '../../seeds/usersSeed.js'

import dtoUserAddFixture from '../../fixtures/users/dtoUserAddFixture.js'
import dtoUserUpdFixture from '../../fixtures/users/dtoUserUpdFixture.js'

import respUserAddedFixture from '../../fixtures/users/respUserAddedFixture.js'
import respUserByIdFixture from '../../fixtures/users/respUserByIdFixture.js'
import respUserUpdatedFixture from '../../fixtures/users/respUserUpdatedFixture.js'
import respUsersAllFixture from '../../fixtures/users/respUsersAllFixture'

import tableUsersAllFixture from '../../fixtures/users/tableUsersAllFixture.js'
import tableUsersWithAddedFixture from '../../fixtures/users/tableUsersWithAddedFixture.js'
import tableUsersWithoutDeletedFixture from '../../fixtures/users/tableUsersWithoutDeletedFixture'
import tableUsersWithUpdatedFixture from '../../fixtures/users/tableUsersWithUpdatedFixture.js'

const resetTable = () =>
  usersTable.splice(0, Infinity, ...structuredClone(usersSeed))

describe('Users REST API', () => {
  let response
  beforeEach(() => {
    resetTable()
  })
  afterEach(() => {
    expect(response.headers['access-control-allow-origin']).toContain('*')
    expect(response.headers['access-control-allow-credentials']).toBeTruthy()
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  describe('GET /users', () => {
    beforeAll(async () => {})
    it('positive get all users', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/users')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toEqual(respUsersAllFixture)
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
  })

  describe('GET /users/:id', () => {
    beforeAll(async () => {})
    it('positive get user by id', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/users/101')
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respUserByIdFixture)
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative get user by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent.get('/api/v0/users/103')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
  })

  describe('DELETE /users/:id', () => {
    beforeAll(async () => {})
    it('positive delete user by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/users/101')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(204)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersWithoutDeletedFixture)
    })
    it('negative delete user by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/users/103')
        .set('cookie', 'sessionId=abcdef')
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative delete user by id dont send cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/users/101')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative delete user by id send cookie wrong sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/users/101')
        .set('cookie', 'sessionId=xxx')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative delete user by id send cookie sessionId low perm', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/users/101')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative delete user by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.delete('/api/v0/users/103')
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative delete user by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .delete('/api/v0/users/103')
        .set('cookie', 'sessionId=fedcba')
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
  })

  describe('POST /users', () => {
    it('positive post user', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/users')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoUserAddFixture)
      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respUserAddedFixture)
      expect(usersTable).toEqual(tableUsersWithAddedFixture)
    })
    it('negative post user without necessary field', async () => {
      const { email, ...userDtoAddFixtureBad } = dtoUserAddFixture
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/users')
        .set('cookie', 'sessionId=abcdef')
        .send(userDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        email: {
          _errors: ['Required'],
        },
      })
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative post user with unnecessary field', async () => {
      const userDtoAddFixtureBad = { ...dtoUserAddFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/users')
        .set('cookie', 'sessionId=abcdef')
        .send(userDtoAddFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ["Unrecognized key(s) in object: 'foo'"],
      })
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative post user without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.post('/api/v0/users').send(dtoUserAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative post user with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/users')
        .set('cookie', 'sessionId=xxx')
        .send(dtoUserAddFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative post user with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .post('/api/v0/users')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoUserAddFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
  })

  describe('PATCH /users/:id', () => {
    it('positive patch user by id', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/users/101')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoUserUpdFixture)
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual(respUserUpdatedFixture)
      expect(usersTable).toEqual(tableUsersWithUpdatedFixture)
    })
    it('negative patch user by id that not exists', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/users/103')
        .set('cookie', 'sessionId=abcdef')
        .send(dtoUserUpdFixture)
      expect(response.status).toBe(404)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative patch user by id without necessary field', async () => {
      const { money, ...userDtoUpdFixtureBad } = dtoUserUpdFixture
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/users/101')
        .set('cookie', 'sessionId=abcdef')
        .send(userDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: [],
        money: {
          _errors: ['Required'],
        },
      })
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative patch user by id with unnecessary field', async () => {
      const userDtoUpdFixtureBad = { ...dtoUserUpdFixture, foo: 'bar' }
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/users/101')
        .set('cookie', 'sessionId=abcdef')
        .send(userDtoUpdFixtureBad)
      expect(response.status).toBe(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.headers['content-type']).toContain('utf-8')
      expect(response.body).toEqual({
        _errors: ["Unrecognized key(s) in object: 'foo'"],
      })
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative patch user by id without cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent.patch('/api/v0/users/101').send(dtoUserUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative patch user by id with invalid cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/users/101')
        .set('cookie', 'sessionId=xxx')
        .send(dtoUserUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative patch user by id with low perms cookie sessionId', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/users/101')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoUserUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative patch user by id combine 404 and 401', async () => {
      const agent = supertest(appHttp)
      response = await agent.patch('/api/v0/users/103').send(dtoUserUpdFixture)
      expect(response.status).toBe(401)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
    it('negative patch user by id combine 404 and 403', async () => {
      const agent = supertest(appHttp)
      response = await agent
        .patch('/api/v0/users/103')
        .set('cookie', 'sessionId=fedcba')
        .send(dtoUserUpdFixture)
      expect(response.status).toBe(403)
      expect(response.headers['content-type']).toBeUndefined()
      expect(response.body).toEqual({})
      expect(usersTable).toEqual(tableUsersAllFixture)
    })
  })
})
