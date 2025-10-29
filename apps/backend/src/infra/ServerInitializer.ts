import { Server } from 'socket.io'
import { createServer } from 'node:http'

export default class ServerInitializer {
  io: Server

  app: any

  middlewares: any[]

  constructor() {
    this.middlewares = []
    this.app = createServer()
    this.io = new Server(this.app)

    this.io.use((socket, next) => {
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
