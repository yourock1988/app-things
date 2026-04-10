import { Namespace, Server } from 'socket.io'
import on from '../../utils/on.js'
import CoR from '../../utils/CoR.js'

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
      handleTurnOn,
      handleTurnOff,
      handleDrain,
    } = teapotControllerIo

    on(socket, 'teapot:getAll', CoR(AUTHZ, getAll))
    on(socket, 'teapot:getById', CoR(ID, AUTHZ, getById))
    on(socket, 'teapot:add', CoR(ADD, AUTHZ, add))
    on(socket, 'teapot:updateById', CoR(ID, UPD, AUTHZ, updateById))
    on(socket, 'teapot:removeById', CoR(ID, AUTHZ, removeById))

    on(socket, 'cl:teapot-show', CoR(AUTHZ, show))
    on(socket, 'cl:teapot-turn_on', CoR(AUTHZ, handleTurnOn))
    on(socket, 'cl:teapot-turn_off', CoR(AUTHZ, handleTurnOff))
    on(socket, 'cl:teapot-drain', CoR(AUTHZ, handleDrain))
  }

  getMiddleware() {
    return this.mwTeapotIo
  }
}
