import servDi from './infra/di/servDi.js'
import { userRouterIo } from './infra/di/userDi.js'

servDi.addRouterIo(userRouterIo)

export default servDi
