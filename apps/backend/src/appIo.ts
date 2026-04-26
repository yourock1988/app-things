import { Server } from 'socket.io'
import { teapotRouterIo } from './infra/di/teapotDi.js'
import { userRouterIo } from './infra/di/userDi.js'
import { carRouterIo } from './infra/di/carDi.js'
import Bus from './Bus.js'

const io = new Server()
const bus = new Bus(io)

bus.use('/teapots', teapotRouterIo)
bus.use('/users', userRouterIo)
bus.use('/cars', carRouterIo)

export default io
