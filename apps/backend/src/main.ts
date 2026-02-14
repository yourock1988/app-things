import appHttp from './appHttp.js'
import appIo from './appIo.js'

const PORT_HTTP = Number(process.env.APP_BE_PORT)
const PORT_IO = Number(process.env.APP_WS_PORT)

global.console.log(process.env.APP_BE_COMMENT)
appHttp.listen(PORT_HTTP, '127.0.0.1', () =>
  global.console.log(`rest PORT: ${PORT_HTTP}`),
)
appIo.listen(PORT_IO)
global.console.log(`io PORT: ${PORT_IO}`)

if (process.argv[2] === '--tmp') {
  global.console.log('!!!STARTED_IN_TEMPORALLY_MODE!!!')
  setTimeout(() => process.exit(0), 11000)
}
