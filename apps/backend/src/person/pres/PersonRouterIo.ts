import type { Namespace, Server } from 'socket.io'
import listen from '../../_utils/listen.js'

export default class PersonRouterIo {
  constructor(
    readonly personControllerIo: any,
    readonly mwPersonIo: any,
  ) {}

  public init(personNamespace: Namespace, io: Server) {
    this.personControllerIo.init(personNamespace, io)
  }

  authN(socket, next) {
    const ctx = { socket, eventName: 'authentication' }
    this.mwPersonIo.AUTHN(ctx, null, next)
  }

  authZ(socket, next) {
    const ctx = { socket, eventName: 'authorization' }
    this.mwPersonIo.AUTHZ(ctx, null, next)
  }

  connector(socket: any) {
    const { personControllerIo, mwPersonIo } = this
    const { ID, ADD, UPD, AUTHZ } = mwPersonIo
    const { getAll, getById, add, updateById, removeById } = personControllerIo

    listen(socket)
      .on('person:getAll', AUTHZ, getAll)
      .on('person:getById', ID, AUTHZ, getById)
      .on('person:add', ADD, AUTHZ, add)
      .on('person:updateById', ID, UPD, AUTHZ, updateById)
      .on('person:removeById', ID, AUTHZ, removeById)
  }
}
