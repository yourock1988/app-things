import { Server } from 'socket.io'
import { carRouterIo } from './infra/di/carDi.js'
// import { userRouterIo } from './infra/di/userDi.js'
import Bus from './Bus.js'

const io = new Server()
const bus = new Bus(io)

bus.use('/cars', carRouterIo)
// bus.use('/users', userRouterIo)

// io.of('/cars').use(car.middlware).on('connection', car.connect)

export default io
