import { Server } from 'socket.io'
// import { teapotRouterIo } from './infra/di/teapotDi.js'
// import { userRouterIo } from './infra/di/userDi.js'
// import { carRouterIo } from './infra/di/carDi.js'
import { teapotRouterIo } from './teapot/teapotDi.js'
import { userRouterIo } from './user/userDi.js'
// import { carRouterIo } from './car/carDi.js'
import Bus from './_utils/Bus.js'
import { carRouterIo, personRouterIo } from './_di.js'

const io = new Server()
const bus = new Bus(io)

bus.use('/teapots', teapotRouterIo)
bus.use('/persons', personRouterIo)
bus.use('/users', userRouterIo)
bus.use('/cars', carRouterIo)

export default io
