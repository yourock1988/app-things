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
    const ctx = {
      socket,
      eventName: 'authentication',
    }
    this.mwUserIo.AUTH(ctx, null, next)
  }

  authZ(socket, next) {
    const ctx = {
      socket,
      eventName: 'authorization',
    }
    this.mwUserIo.AUTH(ctx, null, next)
  }

  connector(socket: any) {
    const { userControllerIo, mwUserIo } = this
    const { ID, ADD, UPD, AUTH } = mwUserIo
    const { getAll, getById, add, updateById, removeById } = userControllerIo

    on(socket, 'user:getAll', CoR(AUTH, getAll))
    on(socket, 'user:getById', CoR(ID, AUTH, getById))
    on(socket, 'user:add', CoR(ADD, AUTH, add))
    on(socket, 'user:updateById', CoR(ID, UPD, AUTH, updateById))
    on(socket, 'user:removeById', CoR(ID, AUTH, removeById))
  }
}
