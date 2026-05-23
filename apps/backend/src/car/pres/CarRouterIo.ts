import type { Namespace, Server, Socket } from 'socket.io'
import type IRouterIo from '../../_domain/IRouterIo.ts'
import type CarControllerIo from './CarControllerIo.ts'
import type { TMwareIo } from '../../_pres/TMwareIo.ts'
import listen from '../../_utils/listen.ts'

export default class CarRouterIo implements IRouterIo {
  private readonly carControllerIo: CarControllerIo

  private readonly mwCarIo: Record<string, TMwareIo>

  constructor(
    carControllerIo: CarControllerIo,
    mwCarIo: Record<string, TMwareIo>,
  ) {
    this.carControllerIo = carControllerIo
    this.mwCarIo = mwCarIo
  }

  public init(carNamespace: Namespace, io: Server): void {
    this.carControllerIo.init(carNamespace, io)
  }

  getMiddlewares(): TMwareIo[] {
    const { SESSID, AUTHN, AUTHZ } = this.mwCarIo
    if (!SESSID || !AUTHN || !AUTHZ) throw new Error('no mware')
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
