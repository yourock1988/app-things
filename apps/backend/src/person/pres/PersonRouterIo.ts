import type { Namespace, Server } from 'socket.io'
import type IRouterIo from '../../_domain/IRouterIo.ts'
import type PersonControllerIo from './PersonControllerIo.ts'
import listen from '../../_utils/listen.ts'

export default class PersonRouterIo implements IRouterIo {
  private readonly personControllerIo: PersonControllerIo

  private readonly mwPersonIo: any

  constructor(personControllerIo: PersonControllerIo, mwPersonIo: any) {
    this.personControllerIo = personControllerIo
    this.mwPersonIo = mwPersonIo
  }

  public init(personNamespace: Namespace, io: Server) {
    this.personControllerIo.init(personNamespace, io)
  }

  getMiddlewares() {
    const { AUTHN, AUTHZ } = this.mwPersonIo
    return [AUTHN, AUTHZ]
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
