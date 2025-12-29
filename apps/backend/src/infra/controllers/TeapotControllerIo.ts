import { Server, Socket } from 'socket.io'
import TeapotService from '../../core/services/TeapotService.js'
// import Teapot from '../../core/models/Teapot.js'
// import SocketError from '../../SocketError.js'
import { TAckFn } from '../../TAckFn.js'
import { TTeapotDto } from '../../core/dtos/TTeapotDtos.js'

const rand = () => 42 // Math.trunc(Math.random() * 420)

export default class TeapotControllerIo {
  constructor(
    readonly teapotService: TeapotService,
    readonly io: Server,
  ) {
    teapotService.on('teapot-ready', (t: TTeapotDto) =>
      io.emit('bc-sv:teapot-ready', t),
    )
  }

  show(_, ack: TAckFn<TTeapotDto>) {
    const teapot = this.teapotService.show()
    setTimeout(() => ack?.(null, teapot), rand())
  }

  handleTurnOn(_, ack: TAckFn<TTeapotDto>, socket: Socket) {
    const isOk = this.teapotService.doTurnOn()
    const teapot = this.teapotService.show()
    setTimeout(() => {
      if (isOk) socket.broadcast.emit('bc-cl:teapot-turned_on', teapot)
      ack?.(null, teapot)
    }, rand())
  }

  handleTurnOff(_, ack: TAckFn<TTeapotDto>, socket: Socket) {
    const isOk = this.teapotService.doTurnOff()
    const teapot = this.teapotService.show()
    setTimeout(() => {
      if (isOk) socket.broadcast.emit('bc-cl:teapot-turned_off', teapot)
      ack?.(null, teapot)
    }, rand())
  }

  handleDrain(_, ack: TAckFn<TTeapotDto>, socket: Socket) {
    const isOk = this.teapotService.doTurnDrain()
    const teapot = this.teapotService.show()
    setTimeout(() => {
      if (isOk) socket.broadcast.emit('bc-cl:teapot-turned_drain', teapot)
      ack?.(null, teapot)
    }, rand())
  }
}
