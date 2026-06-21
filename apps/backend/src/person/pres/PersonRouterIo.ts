import type { Namespace, Server, Socket } from 'socket.io'
import type IRouterIo from '../../_domain/IRouterIo.ts'
import type PersonControllerIo from './PersonControllerIo.ts'
import type { TMwareIo } from '../../_pres/TMwareIo.ts'
import listen from '../../_utils/listen.ts'

export default class PersonRouterIo implements IRouterIo {
  private readonly personControllerIo: PersonControllerIo

  private readonly mwPersonIo: Record<string, TMwareIo>

  constructor(
    personControllerIo: PersonControllerIo,
    mwPersonIo: Record<string, TMwareIo>,
  ) {
    this.personControllerIo = personControllerIo
    this.mwPersonIo = mwPersonIo
  }

  init(personNamespace: Namespace, io: Server): void {
    this.personControllerIo.init(personNamespace, io)
  }

  getMiddlewares(): TMwareIo[] {
    const { AUTHN, AUTHZ } = this.mwPersonIo
    if (!AUTHN || !AUTHZ) throw new Error('no mware')
    return [AUTHN, AUTHZ]
  }

  connector(socket: Socket): void {
    const { personControllerIo, mwPersonIo } = this
    const { ID, ADD, UPD, AUTHZ, ACK } = mwPersonIo
    const { getAll, getById, add, updateById, removeById } = personControllerIo

    if (!ACK || !AUTHZ || !ID || !ADD || !UPD) throw new Error('no mware')

    listen(socket)
      .on('person:getAll', ACK, AUTHZ, getAll)
      .on('person:getById', ACK, ID, AUTHZ, getById)
      .on('person:add', ACK, ADD, AUTHZ, add)
      .on('person:updateById', ACK, ID, UPD, AUTHZ, updateById)
      .on('person:removeById', ACK, ID, AUTHZ, removeById)
  }
}
