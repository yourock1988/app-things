import type { Namespace, Server } from 'socket.io'
import type PersonControllerIo from './PersonControllerIo.js'
import listen from '../../_utils/listen.js'

export default class PersonRouterIo {
  private readonly personControllerIo: PersonControllerIo

  private readonly mwPersonIo: any

  constructor(personControllerIo: PersonControllerIo, mwPersonIo: any) {
    this.personControllerIo = personControllerIo
    this.mwPersonIo = mwPersonIo
  }

  public init(personNamespace: Namespace, io: Server) {
    this.personControllerIo.init(personNamespace, io)
  }

  authN(socket: any, next: any) {
    const ctx = { socket, eventName: 'authentication' }
    this.mwPersonIo.AUTHN(ctx, null, next)
  }

  authZ(socket: any, next: any) {
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
