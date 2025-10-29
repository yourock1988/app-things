import appHttp from './appHttp.js'
import servDi from './infra/di/servDi.js'

const appIo = servDi.getApp()

const PORT_HTTP = process.env.APP_BE_PORT || 8004
const PORT_IO = 7700

appHttp.listen(PORT_HTTP, () => global.console.log(`rest PORT: ${PORT_HTTP}`))
appIo.listen(PORT_IO, () => global.console.log(`io PORT: ${PORT_IO}`))

global.console.log(process.env.APP_BE_COMMENT)
if (process.argv[2] === '--check') {
  global.console.log('!!!STARTED_IN_CHECK_MODE!!!')
  setTimeout(() => process.exit(0), 7000)
}
