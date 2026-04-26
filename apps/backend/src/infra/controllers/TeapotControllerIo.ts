import { TEAPOT } from '@app-x/cmd'
import { Server, Namespace } from 'socket.io'
import TeapotService from '../../core/services/TeapotService.js'
import SocketError from '../../SocketError.js'
import Teapot from '../../core/models/Teapot.js'

const { BC_CL, BC_SV } = TEAPOT

export default class TeapotControllerIo {
  constructor(
    readonly teapotService: TeapotService,
    private teapotNamespace: Namespace | null = null,
    private io: Server | null = null,
  ) {
    this.teapotService.on('teapot!ready', (t: Teapot) => {
      this.teapotNamespace?.emit(BC_SV.BOILED, t)
      this.teapotNamespace?.emit(BC_CL.UPDATED, t)
    })
  }

  init(teapotNamespace: Namespace, io: Server) {
    this.teapotNamespace = teapotNamespace
    this.io = io
  }

  getAll(ctx, args) {
    const [, , ack] = args
    const teapots = this.teapotService.getAll()
    ack?.(null, teapots)
  }

  getById(ctx, args) {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.getById(+id)
    if (!teapot) ack?.(new SocketError(404, 'getById', `id ${id} not exists`))
    else ack?.(null, teapot)
  }

  add(ctx, args) {
    const [, dto, ack] = args
    const o = { ...dto, accountId: ctx.socket.account.id }
    const teapotJson = this.teapotService.add(o).toJSON()
    ctx.socket.broadcast.emit(BC_CL.ADDED, teapotJson)
    ack?.(null, teapotJson)
  }

  updateById(ctx, args) {
    const [{ id }, dto, ack] = args
    const teapotJson = this.teapotService.updateById(id, dto)?.toJSON()
    if (!teapotJson) {
      ack?.(new SocketError(404, 'updateById', `id ${id} not exists or online`))
      return
    }
    ctx.socket.broadcast.emit(BC_CL.UPDATED, teapotJson)
    ack?.(null, teapotJson)
  }

  removeById(ctx, args) {
    const [{ id }, , ack] = args
    const hasBeenExists = this.teapotService.removeById(id)
    if (!hasBeenExists) {
      ack?.(new SocketError(404, 'removeById', `id ${id} not exists or online`))
      return
    }
    ctx.socket.broadcast.emit(BC_CL.DELETED, id)
    ack?.(null)
  }

  show(ctx, args) {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.show(id)
    if (!teapot) ack({ err: '404' })
    else ack?.(null, teapot)
  }

  join(ctx, args) {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.getById(id)
    if (!teapot) {
      ack({ err: '404' })
      return
    }
    const isJoined = this.teapotService.join(teapot)
    const teapotJson = teapot.toJSON()
    if (isJoined) {
      ctx.socket.broadcast.emit(BC_CL.JOINED, teapotJson)
      this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
    }
    ack?.(null, teapotJson)
  }

  leave(ctx, args) {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.getById(id)
    if (!teapot) {
      ack({ err: '404' })
      return
    }
    const isLeaved = this.teapotService.leave(teapot)
    const teapotJson = teapot.toJSON()
    if (isLeaved) {
      ctx.socket.broadcast.emit(BC_CL.LEAVED, teapotJson)
      this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
    }
    ack?.(null, teapotJson)
  }

  handleTurnOn(ctx, args) {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack({ err: '404' })
      return
    }
    const isTurned = this.teapotService.doTurnOn(teapot)
    const teapotJson = teapot.toJSON()
    if (isTurned) {
      ctx.socket.broadcast.emit(BC_CL.TURNED_ON, teapotJson)
      this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
    }
    ack?.(null, teapotJson)
  }

  handleTurnOff(ctx, args) {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack({ err: '404' })
      return
    }
    const isTurned = this.teapotService.doTurnOff(teapot)
    const teapotJson = teapot.toJSON()
    if (isTurned) {
      ctx.socket.broadcast.emit(BC_CL.TURNED_OFF, teapotJson)
      this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
    }
    ack?.(null, teapotJson)
  }

  handleDrain(ctx, args) {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack({ err: '404' })
      return
    }
    const isTurned = this.teapotService.doTurnDrain(teapot)
    const teapotJson = teapot.toJSON()
    if (isTurned) {
      ctx.socket.broadcast.emit(BC_CL.TURNED_DRAIN, teapotJson)
      this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
      // и вот тут можно воспользоваться socket io rooms чтоб рассылать апдейты только админам например
    }
    ack?.(null, teapotJson)
  }
}
