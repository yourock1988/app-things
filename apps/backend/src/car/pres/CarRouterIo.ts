import type { Namespace, Server } from 'socket.io'
// import CoR from '../../_utils/CoR.js'
// import on from '../../_utils/on.js'
import listen from '../../_utils/listen.js'

export default class CarRouterIo {
  constructor(
    readonly carControllerIo: any,
    readonly mwCarIo: any,
  ) {}

  public init(carNamespace: Namespace, io: Server) {
    this.carControllerIo.init(carNamespace, io)
  }

  authN(socket, next) {
    const ctx = { socket, eventName: 'authentication' }
    const message = 'invalid-sessionid'
    this.mwCarIo.SESSID(ctx, [0, 0, () => next({ message })], () => {
      this.mwCarIo.AUTHN(ctx, null, next)
    })
    // setTimeout(() => next({ err: 'err' }, 500))
  }

  authZ(socket, next) {
    const ctx = { socket, eventName: 'authorization' }
    this.mwCarIo.AUTHZ(ctx, null, next)
  }

  connector(socket: any) {
    const { carControllerIo, mwCarIo } = this
    const { ID, ADD, UPD, AUTHZ, ACK } = mwCarIo
    const { getAll, getById, add, updateById, removeById } = carControllerIo

    listen(socket)
      .on('car:getAll', ACK, AUTHZ, getAll)
      .on('car:getById', ACK, ID, AUTHZ, getById)
      .on('car:add', ACK, ADD, AUTHZ, add)
      .on('car:updateById', ACK, ID, UPD, AUTHZ, updateById)
      .on('car:removeById', ACK, ID, AUTHZ, removeById)

    // on(socket, 'car:getAll', CoR(ACK, AUTHZ, getAll))
    // on(socket, 'car:getById', CoR(ACK, ID, AUTHZ, getById))
    // on(socket, 'car:add', CoR(ACK, ADD, AUTHZ, add))
    // on(socket, 'car:updateById', CoR(ACK, ID, UPD, AUTHZ, updateById))
    // on(socket, 'car:removeById', CoR(ACK, ID, AUTHZ, removeById))
  }
}
