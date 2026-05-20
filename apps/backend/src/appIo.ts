import { Server } from 'socket.io'
import Bus from './_utils/Bus.ts'
import { carRouterIo, personRouterIo, teapotRouterIo } from './_di.ts'

const io = new Server()
const bus = new Bus(io)

bus.use('/teapots', teapotRouterIo)
bus.use('/persons', personRouterIo)
bus.use('/cars', carRouterIo)

export default io
