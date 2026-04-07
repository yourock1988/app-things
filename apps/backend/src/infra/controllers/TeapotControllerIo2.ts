import { Server, Namespace } from 'socket.io'
// import { TTeapotAddDto, TTeapotUpdateDto } from '../../core/dtos/TTeapotDtos.js'
import TeapotService2 from '../../core/services/TeapotService2.js'
import SocketError from '../../SocketError.js'
import Teapot from '../../core/models/Teapot.js'

export default class TeapotControllerIo {
  constructor(
    readonly teapotService: TeapotService2,
    private teapotNamespace: Namespace | null = null,
    private io: Server | null = null,
  ) {
    teapotService.on('bc-sv:teapot:added', (teapot: Teapot) =>
      io?.emit('teapot:added', teapot),
    )
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
    ctx.socket.broadcast.emit('bc-cl:teapot:added', teapot)
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
      ctx.socket.broadcast.emit('bc-cl:teapot:updated', teapotJson)
    } else {
      ack?.(new SocketError(404, 'updateById', `teapot id ${id} not exists`))
    }
  }

  removeById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const hasBeenExists = this.teapotService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      ctx.socket.broadcast.emit('bc-cl:teapot:deleted', id)
    } else {
      ack?.(new SocketError(404, 'removeById', `teapot id ${id} not exists`))
    }
  }
}
