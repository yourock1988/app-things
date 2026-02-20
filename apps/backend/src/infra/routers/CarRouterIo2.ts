import { Namespace, Server } from 'socket.io'
import on from '../../utils/on.js'
import CoR from '../../utils/CoR.js'

export default class CarRouterIo2 {
  constructor(
    readonly carControllerIo: any,
    readonly mwCarIo: any,
  ) {}

  public init(carNamespace: Namespace, io: Server) {
    this.carControllerIo.init(carNamespace, io)
  }

  authN(socket, next) {
    global.console.log(this.mwCarIo)
    next()
  }

  authZ(socket, next) {
    global.console.log(this.mwCarIo)
    next()
  }

  connector(socket: any) {
    global.console.log('connector cars')
    const { carControllerIo, mwCarIo } = this
    const { IDio, ADD, UPD } = mwCarIo
    const { getAll, getById, add, updateById, removeById } = carControllerIo

    on(socket, 'car:getAll', getAll)
    on(socket, 'car:getById', CoR(IDio, getById))
    on(socket, 'car:add', CoR(ADD, add))
    on(socket, 'car:updateById', CoR(IDio, UPD, updateById))
    on(socket, 'car:removeById', CoR(IDio, removeById))

    // socket.on('car:getAll', this.carControllerIo.getAll)
    // socket.on('car:getById', this.carControllerIo.getById)
    // socket.on('car:add', (...args: any[]) =>
    //   this.carControllerIo.add(...args, socket),
    // )
    // socket.on('car:updateById', (...args: any[]) =>
    //   this.carControllerIo.updateById(...args, socket),
    // )
    // socket.on('car:removeById', (...args: any[]) =>
    //   this.carControllerIo.removeById(...args, socket),
    // )
  }
}
