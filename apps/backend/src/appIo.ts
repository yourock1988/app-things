import { Server } from 'socket.io'
import Bus from './_utils/Bus.js'
import { carRouterIo, personRouterIo, teapotRouterIo } from './_di.js'

const io = new Server()
const bus = new Bus(io)

bus.use('/teapots', teapotRouterIo)
bus.use('/persons', personRouterIo)
bus.use('/cars', carRouterIo)

export default io
