import type { ExtendedError, Server } from 'socket.io'

function preware(socket, next: (err?: ExtendedError) => void): void {
  const { headers, auth } = socket.handshake
  // eslint-disable-next-line no-param-reassign
  socket.headersAuth = { ...headers, ...auth }
  next()
}

export default class Bus {
  private readonly io: Server

  constructor(io: Server) {
    this.io = io
  }

  use(pathName: string, router): void {
    const nsp = this.io.of(pathName).use(preware)
    router.getMiddlewares().forEach(mw => {
      nsp.use((socket, next) => mw({ socket, eventName: mw.txt }, null, next))
    })
    nsp.on('connection', router.connector)
    router.init(nsp, this.io)
  }
}
