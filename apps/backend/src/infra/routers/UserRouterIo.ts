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
    global.console.log(this.mwUserIo)
    const ctx = {
      socket,
      eventName: 'authentication',
    }
    this.mwUserIo.AUTHio(ctx, null, next)
    // next()
  }

  authZ(socket, next) {
    global.console.log(this.mwUserIo)
    const ctx = {
      socket,
      eventName: 'authorization',
    }
    this.mwUserIo.AUTHio(ctx, null, next)
    // next()
  }

  connector(socket: any) {
    global.console.log('connector users')
    const { userControllerIo, mwUserIo } = this
    const { IDio, ADD, UPD, AUTHio } = mwUserIo
    const { getAll, getById, add, updateById, removeById } = userControllerIo

    on(socket, 'user:getAll', CoR(AUTHio, getAll))
    on(socket, 'user:getById', CoR(IDio, AUTHio, getById))
    on(socket, 'user:add', CoR(ADD, AUTHio, add))
    on(socket, 'user:updateById', CoR(IDio, UPD, AUTHio, updateById))
    on(socket, 'user:removeById', CoR(IDio, AUTHio, removeById))

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
