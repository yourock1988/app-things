import { userRouterIo } from './infra/di/userDi.js'
import { carRouterIo } from './infra/di/carDi.js'
import servDi from './infra/di/servDi.js'
import teapotRouterIo from './infra/di/teapotDi.js'

servDi.addRouterIo(teapotRouterIo)
servDi.addRouterIo(userRouterIo)
servDi.addRouterIo(carRouterIo)

export default servDi
