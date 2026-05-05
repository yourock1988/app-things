import type { Namespace, Server } from 'socket.io'
import CoR from '../../_utils/CoR.js'
import on from '../../_utils/on.js'

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

    on(socket, 'person:getAll', CoR(AUTHZ, getAll))
    on(socket, 'person:getById', CoR(ID, AUTHZ, getById))
    on(socket, 'person:add', CoR(ADD, AUTHZ, add))
    on(socket, 'person:updateById', CoR(ID, UPD, AUTHZ, updateById))
    on(socket, 'person:removeById', CoR(ID, AUTHZ, removeById))
  }
}
