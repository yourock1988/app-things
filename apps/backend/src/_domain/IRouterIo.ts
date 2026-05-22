import type { Namespace, Server, Socket } from 'socket.io'

export default interface IRouterIo {
  init(nsp: Namespace, io: Server): void

  getMiddlewares(): any[]

  connector(socket: Socket): void
}
