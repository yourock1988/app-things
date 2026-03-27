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
    // global.console.log(this.mwUserIo)
    const ctx = {
      socket,
      eventName: 'authentication',
    }
    this.mwUserIo.AUTH(ctx, null, next) // тут надо AUTHn
    // next()
  }

  authZ(socket, next) {
    // global.console.log(this.mwUserIo)
    const ctx = {
      socket,
      eventName: 'authorization',
    }
    this.mwUserIo.AUTH(ctx, null, next) // тут надо AUTHz
    // next()
  }

  connector(socket: any) {
    global.console.log('connector users')
    const { userControllerIo, mwUserIo } = this
    const { ID, ADD, UPD, AUTH } = mwUserIo // тут надо AUTHz
    const { getAll, getById, add, updateById, removeById } = userControllerIo

    on(socket, 'user:getAll', CoR(AUTH, getAll))
    on(socket, 'user:getById', CoR(ID, AUTH, getById))
    on(socket, 'user:add', CoR(ADD, AUTH, add))
    on(socket, 'user:updateById', CoR(ID, UPD, AUTH, updateById))
    on(socket, 'user:removeById', CoR(ID, AUTH, removeById))

    // socket.on('user:getAll', this.userControllerIo.getAll)
    // socket.on('user:getById', this.userControllerIo.getById)
    // socket.on('user:add', (...args: any[]) =>
    //   this.userControllerIo.add(...args, socket),
    // )
    // socket.on('user:updateById', (...args: any[]) =>
    //   this.userControllerIo.updateById(...args, socket),
    // )
    // socket.on('user:removeById', (...args: any[]) =>
    //   this.userControllerIo.removeById(...args, socket),
    // )
  }
}
