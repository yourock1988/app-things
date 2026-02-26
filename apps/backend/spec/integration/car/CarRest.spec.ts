import appHttp from '../../../src/appHttp'
import request from 'supertest'

test('adds 1 + 2 to equal 3', () => {
  request(appHttp).get('/cars')
  //   .set('Accept', 'application/json')
  //   // .set('Accept', 'text/html')
  //   .expect('Content-Type', /json/)
  //   // .expect('Content-Length', '15')
  //   .expect(200)
  //   .end(function (err, res) {
  //     if (err) throw err
  //   })
})
