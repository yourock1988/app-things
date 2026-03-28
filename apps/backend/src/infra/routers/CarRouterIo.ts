import { Namespace, Server } from 'socket.io'
import on from '../../utils/on.js'
import CoR from '../../utils/CoR.js'

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
    this.mwCarIo.AUTHN(ctx, null, next)
  }

  authZ(socket, next) {
    const ctx = { socket, eventName: 'authorization' }
    this.mwCarIo.AUTHZ(ctx, null, next)
  }

  connector(socket: any) {
    const { carControllerIo, mwCarIo } = this
    const { ID, ADD, UPD, AUTHZ } = mwCarIo
    const { getAll, getById, add, updateById, removeById } = carControllerIo

    on(socket, 'car:getAll', CoR(AUTHZ, getAll))
    on(socket, 'car:getById', CoR(ID, AUTHZ, getById))
    on(socket, 'car:add', CoR(ADD, AUTHZ, add))
    on(socket, 'car:updateById', CoR(ID, UPD, AUTHZ, updateById))
    on(socket, 'car:removeById', CoR(ID, AUTHZ, removeById))
  }
}
