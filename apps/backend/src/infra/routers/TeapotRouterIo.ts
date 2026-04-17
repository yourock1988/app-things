import { TEAPOT } from '@app-x/cmd'
import { Namespace, Server } from 'socket.io'
import on from '../../utils/on.js'
import CoR from '../../utils/CoR.js'

const { CL } = TEAPOT

export default class TeapotRouterIo {
  constructor(
    readonly teapotControllerIo: any,
    readonly mwTeapotIo: any,
  ) {}

  public init(teapotNamespace: Namespace, io: Server) {
    this.teapotControllerIo.init(teapotNamespace, io)
  }

  authN(socket, next) {
    const ctx = { socket, eventName: 'authentication' }
    this.mwTeapotIo.AUTHN(ctx, null, next)
  }

  authZ(socket, next) {
    const ctx = { socket, eventName: 'authorization' }
    this.mwTeapotIo.AUTHZ(ctx, null, next)
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

    on(socket, CL.GET_ALL, CoR(AUTHZ, getAll))
    on(socket, CL.GET_BY_ID, CoR(ID, AUTHZ, getById))
    on(socket, CL.ADD, CoR(ADD, AUTHZ, add))
    on(socket, CL.UPD_BY_ID, CoR(ID, UPD, AUTHZ, updateById))
    on(socket, CL.DEL_BY_ID, CoR(ID, AUTHZ, removeById))

    on(socket, CL.SHOW, CoR(AUTHZ, show))
    on(socket, CL.JOIN, CoR(AUTHZ, join))
    on(socket, CL.LEAVE, CoR(AUTHZ, leave))
    on(socket, CL.TURN_ON, CoR(AUTHZ, handleTurnOn))
    on(socket, CL.TURN_OFF, CoR(AUTHZ, handleTurnOff))
    on(socket, CL.TURN_DRAIN, CoR(AUTHZ, handleDrain))
  }

  getMiddleware() {
    return this.mwTeapotIo
  }
}
