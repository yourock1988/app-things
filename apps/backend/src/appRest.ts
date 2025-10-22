import express from 'express'
import routes from './routes.js'

const appRest = express()

appRest.use(express.json())
appRest.use(express.urlencoded({ extended: true }))
appRest.use(routes)

appRest.use(routes)

export default appRest
