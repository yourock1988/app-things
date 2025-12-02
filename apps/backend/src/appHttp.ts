import express from 'express'
import welcomeRouter from './welcomeRouter.js'
import staticRouter from './staticRouter.js'
import rest from './rest.js'

const appHttp = express()

appHttp.use('/', welcomeRouter)
appHttp.use('/', staticRouter)
appHttp.use('/api/v0', rest)

export default appHttp
