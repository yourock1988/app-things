import appRest from './appRest.js'
import appIo from './appIo.js'

const PORT_REST = process.env.APP_BE_PORT || 8004
const PORT_IO = 7700

appRest.listen(PORT_REST, () => global.console.log(`rest PORT: ${PORT_REST}`))
appIo.listen(PORT_IO, () => global.console.log(`io PORT: ${PORT_IO}`))

global.console.log(process.env.APP_BE_COMMENT)
if (process.argv[2] === '--check') {
  global.console.log('!!!STARTED_IN_CHECK_MODE!!!')
  setTimeout(() => process.exit(0), 7000)
}
