import { Server } from 'socket.io'
// import { teapotRouterIo } from './infra/di/teapotDi.js'
// import { userRouterIo } from './infra/di/userDi.js'
// import { carRouterIo } from './infra/di/carDi.js'
import { teapotRouterIo } from './teapot/infra/teapotDi.js'
import { userRouterIo } from './user/infra/userDi.js'
import { carRouterIo } from './car/infra/carDi.js'
import Bus from './_utils/Bus.js'

const io = new Server()
const bus = new Bus(io)

bus.use('/teapots', teapotRouterIo)
bus.use('/users', userRouterIo)
bus.use('/cars', carRouterIo)

export default io
