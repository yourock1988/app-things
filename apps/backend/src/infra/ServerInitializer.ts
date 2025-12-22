import { createServer } from 'node:http'
import { Server } from 'socket.io'

const slowdown = (_: any, next: any) => setTimeout(next, 300)

export default class ServerInitializer {
  io: Server

  app: any

  middlewares: any[]

  constructor() {
    this.middlewares = [slowdown]
    this.app = createServer()
    this.io = new Server(this.app)

    this.io.use((socket, next) => {
      global.console.log(socket.handshake.auth)
      this.middlewares.forEach(mw => socket.use(mw))
      next()
    })
  }

  getIo() {
    return this.io
  }

  getApp() {
    return this.app
  }

  addRouterIo(routerIo: any) {
    this.middlewares.push(routerIo.getMiddleware())
    this.io.on('connection', routerIo.registerHandlers)
  }
}
