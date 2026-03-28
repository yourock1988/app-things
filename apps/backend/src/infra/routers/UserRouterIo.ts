import { Namespace, Server } from 'socket.io'
import on from '../../utils/on.js'
import CoR from '../../utils/CoR.js'

export default class UserRouterIo {
  constructor(
    readonly userControllerIo: any,
    readonly mwUserIo: any,
  ) {}

  public init(userNamespace: Namespace, io: Server) {
    this.userControllerIo.init(userNamespace, io)
  }

  authN(socket, next) {
    const ctx = { socket, eventName: 'authentication' }
    this.mwUserIo.AUTHN(ctx, null, next)
  }

  authZ(socket, next) {
    const ctx = { socket, eventName: 'authorization' }
    this.mwUserIo.AUTHZ(ctx, null, next)
  }

  connector(socket: any) {
    const { userControllerIo, mwUserIo } = this
    const { ID, ADD, UPD, AUTHZ } = mwUserIo
    const { getAll, getById, add, updateById, removeById } = userControllerIo

    on(socket, 'user:getAll', CoR(AUTHZ, getAll))
    on(socket, 'user:getById', CoR(ID, AUTHZ, getById))
    on(socket, 'user:add', CoR(ADD, AUTHZ, add))
    on(socket, 'user:updateById', CoR(ID, UPD, AUTHZ, updateById))
    on(socket, 'user:removeById', CoR(ID, AUTHZ, removeById))
  }
}
