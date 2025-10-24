import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import routes from './routes.js'

const appRest = express()
const corsOptions = { origin: true, credentials: true }
const urlencodedOptions = { extended: true }

appRest.use([
  cookieParser() as any,
  cors(corsOptions),
  express.json(),
  express.urlencoded(urlencodedOptions),
  routes,
])

export default appRest
