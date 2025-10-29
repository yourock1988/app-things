import { userRouterIo } from './infra/di/userDi.js'
import servDi from './infra/di/servDi.js'

servDi.addRouterIo(userRouterIo)

export default servDi
