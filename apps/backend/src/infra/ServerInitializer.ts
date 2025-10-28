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
      // socket.use(mwUserIo)
      next()
    })
  }

  getIo() {
    return this.io
  }

  getApp() {
    return this.app
  }

  addMiddleware(mw: any) {
    this.middlewares.push(mw)
  }

  addRouterIo(routerIo: any) {
    this.io.on('connection', routerIo)
  }
}
