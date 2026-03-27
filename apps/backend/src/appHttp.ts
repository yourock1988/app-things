// import helmet from 'helmet'
import express from 'express'
import staticRouter from './staticRouter.js'
import rest from './rest.js'

const appHttp = express()

appHttp.disable('x-powered-by')
// appHttp.use(helmet())

appHttp.use('/api/v0', rest)
appHttp.use('', staticRouter)

export default appHttp
