import { Server, Namespace } from 'socket.io'
import { TTeapotUpdateDto } from '../../core/dtos/TTeapotDtos.js'
import TeapotService from '../../core/services/TeapotService.js'

const rand = () => 42 // Math.trunc(Math.random() * 420)

export default class TeapotControllerIo {
  constructor(
    readonly teapotService: TeapotService,
    private teapotNamespace: Namespace | null = null,
    private io: Server | null = null,
  ) {
    teapotService.on('teapot-ready', (t: TTeapotUpdateDto) =>
      io?.emit('bc-sv:teapot-ready', t),
    )
  }

  init(teapotNamespace: Namespace, io: Server) {
    this.teapotNamespace = teapotNamespace
    this.io = io
  }

  show(ctx, args) {
    const ack = args.at(2)
    const teapot = this.teapotService.show()
    setTimeout(() => ack?.(null, teapot), rand())
  }

  handleTurnOn(ctx, args) {
    const ack = args.at(2)
    const isOk = this.teapotService.doTurnOn()
    const teapot = this.teapotService.show()
    setTimeout(() => {
      if (isOk) ctx.socket.broadcast.emit('bc-cl:teapot-turned_on', teapot)
      ack?.(null, teapot)
    }, rand())
  }

  handleTurnOff(ctx, args) {
    const ack = args.at(2)
    const isOk = this.teapotService.doTurnOff()
    const teapot = this.teapotService.show()
    setTimeout(() => {
      if (isOk) ctx.socket.broadcast.emit('bc-cl:teapot-turned_off', teapot)
      ack?.(null, teapot)
    }, rand())
  }

  handleDrain(ctx, args) {
    const ack = args.at(2)
    const isOk = this.teapotService.doTurnDrain()
    const teapot = this.teapotService.show()
    setTimeout(() => {
      if (isOk) ctx.socket.broadcast.emit('bc-cl:teapot-drained', teapot)
      ack?.(null, teapot)
    }, rand())
  }
}
