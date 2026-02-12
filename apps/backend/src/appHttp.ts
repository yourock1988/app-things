import express from 'express'
import welcomeRouter from './welcomeRouter.js'
import staticRouter from './staticRouter.js'
import rest from './rest.js'

const appHttp = express()

appHttp.use('/api/v0', rest)
appHttp.use('', welcomeRouter)
appHttp.use('', staticRouter)

export default appHttp
