import { TEAPOT } from '@app-x/cmd'
import type { Namespace, Server } from 'socket.io'
import type IRouterIo from '../../_domain/IRouterIo.ts'
import type TeapotControllerIo from './TeapotControllerIo.ts'
import type { TMwareIo } from '../../_pres/TMwareIo.ts'
import listen from '../../_utils/listen.ts'

const { CL } = TEAPOT

export default class TeapotRouterIo implements IRouterIo {
  private readonly teapotControllerIo: TeapotControllerIo

  private readonly mwTeapotIo: Record<string, TMwareIo>

  constructor(
    teapotControllerIo: TeapotControllerIo,
    mwTeapotIo: Record<string, TMwareIo>,
  ) {
    this.teapotControllerIo = teapotControllerIo
    this.mwTeapotIo = mwTeapotIo
  }

  public init(teapotNamespace: Namespace, io: Server) {
    this.teapotControllerIo.init(teapotNamespace, io)
  }

  getMiddlewares(): TMwareIo[] {
    const { AUTHN, AUTHZ } = this.mwTeapotIo
    if (!AUTHN || !AUTHZ) throw new Error('no mware')
    return [AUTHN, AUTHZ]
  }

  connector(socket: any) {
    const { teapotControllerIo, mwTeapotIo } = this
    const { ID, ADD, UPD, AUTHZ } = mwTeapotIo
    const {
      getAll,
      getById,
      add,
      updateById,
      removeById,
      show,
      join,
      leave,
      handleTurnOn,
      handleTurnOff,
      handleDrain,
    } = teapotControllerIo

    listen(socket)
      .on(CL.GET_ALL, AUTHZ, getAll)
      .on(CL.GET_BY_ID, ID, AUTHZ, getById)
      .on(CL.ADD, ADD, AUTHZ, add)
      .on(CL.UPD_BY_ID, ID, UPD, AUTHZ, updateById)
      .on(CL.DEL_BY_ID, ID, AUTHZ, removeById)

      .on(CL.SHOW, AUTHZ, show)
      .on(CL.JOIN, AUTHZ, join)
      .on(CL.LEAVE, AUTHZ, leave)
      .on(CL.TURN_ON, AUTHZ, handleTurnOn)
      .on(CL.TURN_OFF, AUTHZ, handleTurnOff)
      .on(CL.TURN_DRAIN, AUTHZ, handleDrain)
  }

  getMiddleware() {
    return this.mwTeapotIo
  }
}
