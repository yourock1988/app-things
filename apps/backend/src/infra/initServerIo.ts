import { Server, Socket } from 'socket.io'
import mwUserIo from './middlewares/mwUserIo.js'
import { userControllerIo } from '../utils/di/userControllerDi.js'

export default function initServerIo(appIo: any) {
  const io = new Server(appIo)

  userControllerIo.setServer(io)

  io.use((socket, next) => {
    global.console.log(socket.id)
    setTimeout(next, 100)
    // next(new Error('very bad client connected'))
    socket.use(mwUserIo)
  })

  io.on('connection', addSocketToUser)
  function addSocketToUser(socket: Socket) {
    socket.on('user:add', userControllerIo.add)
    socket.on('user:getAll', userControllerIo.getAll)
    socket.on('user:getById', userControllerIo.getById)
    socket.on('user:updateById', userControllerIo.updateById)
  }
}
