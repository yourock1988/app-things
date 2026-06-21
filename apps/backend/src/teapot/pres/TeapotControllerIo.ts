import { TEAPOT } from '@app-x/cmd'
import type { Server, Namespace } from 'socket.io'
import type TeapotService from '../domain/TeapotService.ts'
import type Teapot from '../domain/Teapot.ts'
import type { TTeapotAddDto, TTeapotUpdateDto } from '../domain/TTeapotDtos.ts'
import type { TMwareIo } from '../../_pres/TMwareIo.ts'

const { BC_CL, BC_SV } = TEAPOT

// type Tctx = {
//   socket: Socket
//   eventName: string
// }

// type Targs<Tdto = undefined> = [
//   { id: number },
//   Tdto,
//   (err: null | number, data?: any) => void,
// ]

export default class TeapotControllerIo {
  private readonly teapotService: TeapotService

  private teapotNamespace: Namespace | null = null

  private io: Server | null = null

  constructor(teapotService: TeapotService) {
    this.teapotService = teapotService
    this.teapotService.on('teapot!ready', (t: Teapot) => {
      this.teapotNamespace?.emit(BC_SV.BOILED, t)
      this.teapotNamespace?.emit(BC_CL.UPDATED, t)
    })
  }

  init(teapotNamespace: Namespace, io: Server): void {
    this.teapotNamespace = teapotNamespace
    this.io = io
    this.io.to('room-101').emit('foo', 'bar')
    this.io.use((_, next) => next())
  }

  getAll: TMwareIo = (_, args) => {
    const [, , ack] = args
    const teapots = this.teapotService.getAll()
    ack?.(null, teapots)
  }

  getById: TMwareIo = (_, args) => {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.getById(+id)
    if (!teapot) ack?.(404)
    else ack?.(null, teapot)
  }

  add: TMwareIo<TTeapotAddDto> = (ctx, args) => {
    const [, dto, ack] = args
    if (!ctx.socket.account) return ack?.(401)
    const o = { ...dto, accountId: ctx.socket.account.id }
    const teapotJson = this.teapotService.add(o).toJSON()
    ctx.socket.broadcast.emit(BC_CL.ADDED, teapotJson)
    ack?.(null, teapotJson)
  }

  updateById: TMwareIo<TTeapotUpdateDto> = (ctx, args) => {
    const [{ id }, dto, ack] = args
    const teapotJson = this.teapotService.updateById(id, dto)?.toJSON()
    if (!teapotJson) {
      ack?.(404) // or method not allowed if online
      return
    }
    ctx.socket.broadcast.emit(BC_CL.UPDATED, teapotJson)
    ack?.(null, teapotJson)
  }

  removeById: TMwareIo = (ctx, args) => {
    const [{ id }, , ack] = args
    const hasBeenExists = this.teapotService.removeById(id)
    if (!hasBeenExists) {
      ack?.(404) // or method not allowed if online
      return
    }
    ctx.socket.broadcast.emit(BC_CL.DELETED, id)
    ack?.(null)
  }

  show: TMwareIo = (_, args) => {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.show(id)
    if (!teapot) ack?.(404)
    else ack?.(null, teapot)
  }

  join: TMwareIo = (ctx, args) => {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.getById(id)
    if (!teapot) {
      ack?.(404)
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

  leave: TMwareIo = (ctx, args) => {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.getById(id)
    if (!teapot) {
      ack?.(404)
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

  handleTurnOn: TMwareIo = (ctx, args) => {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack?.(404)
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

  handleTurnOff: TMwareIo = (ctx, args) => {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack?.(404)
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

  handleDrain: TMwareIo = (ctx, args) => {
    const [{ id }, , ack] = args
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack?.(404)
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
