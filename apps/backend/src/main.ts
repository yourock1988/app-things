import appHttp from './appHttp.js'
import appWs from './appWs.js'

const PORT_HTTP = process.env.APP_BE_PORT || 8004
const PORT_IO = 7700

appHttp.listen(PORT_HTTP, () => global.console.log(`rest PORT: ${PORT_HTTP}`))
appWs.listen(PORT_IO, () => global.console.log(`io PORT: ${PORT_IO}`))

global.console.log(process.env.APP_BE_COMMENT)
if (process.argv[2] === '--tmp') {
  global.console.log('!!!STARTED_IN_TEMPORALLY_MODE!!!')
  setTimeout(() => process.exit(0), 7000)
}
