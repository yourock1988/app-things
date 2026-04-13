import { Server } from 'socket.io'
import { carRouterIo } from './infra/di/carDi.js'
import { userRouterIo } from './infra/di/userDi.js'
import Bus from './Bus.js'
import { teapotRouterIo } from './infra/di/teapotDi.js'

const io = new Server()
const bus = new Bus(io)

bus.use('/cars', carRouterIo)
bus.use('/users', userRouterIo)
bus.use('/teapots', teapotRouterIo)

export default io
