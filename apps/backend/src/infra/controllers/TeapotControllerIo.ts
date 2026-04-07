import { Server, Namespace } from 'socket.io'
import { TTeapotUpdateDto } from '../../core/dtos/TTeapotDtos.js'
import TeapotService from '../../core/services/TeapotService.js'

// const rand = () => 42 // Math.trunc(Math.random() * 420)

export default class TeapotControllerIo {
  constructor(
    readonly teapotService: TeapotService,
    private teapotNamespace: Namespace | null = null,
    private io: Server | null = null,
  ) {
    teapotService.on('teapot-ready', (t: TTeapotUpdateDto) =>
      io?.emit('bc-sv:teapot-ready', t),
    )
    teapotService.on('teapot-turned_on', (t: TTeapotUpdateDto) =>
      io?.emit('bc-sv:teapot-turned_on', t),
    )
    teapotService.on('teapot-already_turned_on', (t: TTeapotUpdateDto) =>
      io?.emit('bc-sv:teapot-already_turned_on', t),
    )
  }

  init(teapotNamespace: Namespace, io: Server) {
    this.teapotNamespace = teapotNamespace
    this.io = io
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
      if (isOk) ctx.socket.broadcast.emit('bc-cl:teapot-turned_on', teapot)
      ack?.(null, teapot)
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
      if (isOk) ctx.socket.broadcast.emit('bc-cl:teapot-turned_off', teapot)
      ack?.(null, teapot)
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
      if (isOk) ctx.socket.broadcast.emit('bc-cl:teapot-drained', teapot)
      ack?.(null, teapot)
    }
  }
}
