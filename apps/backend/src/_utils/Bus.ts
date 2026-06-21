import type { ExtendedError, Server, Socket } from 'socket.io'
import type IRouterIo from '../_domain/IRouterIo.ts'
// import type { TSocketExt } from '../_pres/TMwareIo.ts'

function preware(socket: Socket, next: (err?: ExtendedError) => void): void {
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

  use(pathName: string, router: IRouterIo): void {
    const nsp = this.io.of(pathName).use(preware)
    router.getMiddlewares().forEach(mw => {
      nsp.use((socket, next) => {
        mw(
          { socket, eventName: mw.msg ?? '' },
          [{ id: -1 }, [], () => {}],
          err => {
            if (err) next({ message: err.message, data: err.data, name: 'loh' })
            else next()
          },
        )
      })
    })
    nsp.on('connection', router.connector)
    router.init(nsp, this.io)
  }
}
