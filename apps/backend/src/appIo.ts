import { createServer } from 'node:http'
import initServerIo from './infra/initServerIo.js'

const appIo = createServer()

initServerIo(appIo)

export default appIo
