import type { Namespace, Server, Socket } from 'socket.io'
import type CarControllerIo from './CarControllerIo.ts'
import listen from '../../_utils/listen.ts'

export default class CarRouterIo {
  private readonly carControllerIo: CarControllerIo

  private readonly mwCarIo: any

  constructor(carControllerIo: CarControllerIo, mwCarIo) {
    this.carControllerIo = carControllerIo
    this.mwCarIo = mwCarIo
  }

  public init(carNamespace: Namespace, io: Server): void {
    this.carControllerIo.init(carNamespace, io)
  }

  getMiddlewares() {
    const { SESSID, AUTHN, AUTHZ } = this.mwCarIo
    return [SESSID, AUTHN, AUTHZ]
  }

  connector(socket: Socket): void {
    const { carControllerIo, mwCarIo } = this
    const { ID, ADD, UPD, AUTHZ, ACK } = mwCarIo
    const { getAll, getById, add, updateById, removeById } = carControllerIo

    listen(socket)
      .on('car:getAll', ACK, AUTHZ, getAll)
      .on('car:getById', ACK, ID, AUTHZ, getById)
      .on('car:add', ACK, ADD, AUTHZ, add)
      .on('car:updateById', ACK, ID, UPD, AUTHZ, updateById)
      .on('car:removeById', ACK, ID, AUTHZ, removeById)
  }
}
