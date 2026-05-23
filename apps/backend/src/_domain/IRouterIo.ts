import type { Namespace, Server, Socket } from 'socket.io'
import type { TMwareIo } from '../_pres/TMwareIo.ts'

export default interface IRouterIo {
  init(nsp: Namespace, io: Server): void

  getMiddlewares(): TMwareIo[]

  connector(socket: Socket): void
}
