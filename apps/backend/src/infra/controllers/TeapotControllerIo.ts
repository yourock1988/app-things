import { TEAPOT } from '@app-x/cmd'
import { Server, Namespace } from 'socket.io'
// import { TTeapotUpdateDto } from '../../core/dtos/TTeapotDtos.js'
import TeapotService from '../../core/services/TeapotService.js'
import SocketError from '../../SocketError.js'
import Teapot from '../../core/models/Teapot.js'

const { BC_CL, BC_SV } = TEAPOT

// const rand = () => 42 // Math.trunc(Math.random() * 420)

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
    // teapotService.on('teapot!turned_on', (t: Teapot) =>
    //   this.io?.emit('bc-sv:teapot-turned_on', t),
    // )
    // teapotService.on('teapot!already_turned_on', (t: Teapot) =>
    //   this.io?.emit('bc-sv:teapot-already_turned_on', t),
    // )
    this.teapotService.on('teapot!added', (teapot: Teapot) =>
      this.io?.emit('bc-sv:teapot:added', teapot),
    )
    // в том случае если добавлено из http rest, то разослать всем
  }

  init(teapotNamespace: Namespace, io: Server) {
    this.teapotNamespace = teapotNamespace
    this.io = io
  }

  getAll(ctx, args) {
    const ack = args.at(2)
    const teapots = this.teapotService.getAll()
    ack?.(null, teapots)
  }

  getById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const teapot = this.teapotService.getById(+id)
    if (teapot) ack?.(null, teapot)
    else ack?.(new SocketError(404, 'getById', `teapot id ${id} not exists`))
  }

  add(ctx, args) {
    const ack = args.at(2)
    const dto = args.at(1)
    const teapot = this.teapotService.add(dto).toJSON()
    ack?.(null, teapot)
    ctx.socket.broadcast.emit(BC_CL.ADDED, teapot)
    // this.io.emit('bc-sv:teapot:added', teapot)
  }

  updateById(ctx, args) {
    const { id } = args.at(0)
    const dto = args.at(1)
    const ack = args.at(2)
    const teapot = this.teapotService.updateById(id, dto)
    if (teapot) {
      const teapotJson = teapot.toJSON()
      ack?.(null, teapotJson)
      ctx.socket.broadcast.emit(BC_CL.UPDATED, teapotJson)
    } else {
      ack?.(new SocketError(404, 'updateById', `id ${id} not exists or online`))
    }
  }

  removeById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const hasBeenExists = this.teapotService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      ctx.socket.broadcast.emit(BC_CL.DELETED, id)
    } else {
      ack?.(new SocketError(404, 'removeById', `id ${id} not exists or online`))
    }
  }

  show(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const teapot = this.teapotService.show(id)
    if (teapot) ack?.(null, teapot)
    else ack({ err: '404' })
  }

  handleTurnOn(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack({ err: '404' })
    } else {
      const isOk = this.teapotService.doTurnOn(id)
      const teapotJson = teapot.toJSON()
      if (isOk) {
        ctx.socket.broadcast.emit(BC_CL.TURNED_ON, teapotJson)
        this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
      }
      ack?.(null, teapotJson)
    }
  }

  handleTurnOff(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack({ err: '404' })
    } else {
      const isOk = this.teapotService.doTurnOff(id)
      const teapotJson = teapot.toJSON()
      if (isOk) {
        ctx.socket.broadcast.emit(BC_CL.TURNED_OFF, teapotJson)
        this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
      }
      ack?.(null, teapotJson)
    }
  }

  handleDrain(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack({ err: '404' })
    } else {
      const isOk = this.teapotService.doTurnDrain(id)
      const teapotJson = teapot.toJSON()
      if (isOk) {
        ctx.socket.broadcast.emit(BC_CL.TURNED_DRAIN, teapotJson)
        this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
        // и вот тут можно воспользоваться socket io rooms чтоб рассылать апдейты только админам например
      }
      ack?.(null, teapotJson)
    }
  }
}
