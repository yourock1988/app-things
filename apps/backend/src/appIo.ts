import { Server } from 'socket.io'
// import { teapotRouterIo } from './infra/di/teapotDi.js'
// import { userRouterIo } from './infra/di/userDi.js'
// import { carRouterIo } from './infra/di/carDi.js'
// import { teapotRouterIo } from './teapot/teapotDi.js'
// import { carRouterIo } from './car/carDi.js'
import Bus from './_utils/Bus.js'
import { carRouterIo, personRouterIo, teapotRouterIo } from './_di.js'

const io = new Server()
const bus = new Bus(io)

bus.use('/teapots', teapotRouterIo)
bus.use('/persons', personRouterIo)
bus.use('/cars', carRouterIo)

export default io
