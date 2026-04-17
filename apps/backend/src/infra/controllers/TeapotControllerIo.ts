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
    const dto = args.at(1)
    const ack = args.at(2)
    const teapotJson = this.teapotService.add(dto).toJSON()
    ctx.socket.broadcast.emit(BC_CL.ADDED, teapotJson)
    ack?.(null, teapotJson)
  }

  updateById(ctx, args) {
    const { id } = args.at(0)
    const dto = args.at(1)
    const ack = args.at(2)
    const teapotJson = this.teapotService.updateById(id, dto)?.toJSON()
    if (teapotJson) {
      ctx.socket.broadcast.emit(BC_CL.UPDATED, teapotJson)
      ack?.(null, teapotJson)
    } else {
      ack?.(new SocketError(404, 'updateById', `id ${id} not exists or online`))
    }
  }

  removeById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const hasBeenExists = this.teapotService.removeById(id)
    if (hasBeenExists) {
      ctx.socket.broadcast.emit(BC_CL.DELETED, id)
      ack?.(null)
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

  join(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const teapot = this.teapotService.getById(id)
    if (!teapot) {
      ack({ err: '404' })
    } else {
      const isJoined = this.teapotService.join(teapot)
      const teapotJson = teapot.toJSON()
      if (isJoined) {
        ctx.socket.broadcast.emit(BC_CL.JOINED, teapotJson)
        this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
      }
      ack?.(null, teapotJson)
    }
  }

  leave(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const teapot = this.teapotService.getById(id)
    if (!teapot) {
      ack({ err: '404' })
    } else {
      const isLeaved = this.teapotService.leave(teapot)
      const teapotJson = teapot.toJSON()
      if (isLeaved) {
        ctx.socket.broadcast.emit(BC_CL.LEAVED, teapotJson)
        this.teapotNamespace?.emit(BC_CL.UPDATED, teapotJson)
      }
      ack?.(null, teapotJson)
    }
  }

  handleTurnOn(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const teapot = this.teapotService.show(id)
    if (!teapot) {
      ack({ err: '404' })
    } else {
      const isTurned = this.teapotService.doTurnOn(teapot)
      const teapotJson = teapot.toJSON()
      if (isTurned) {
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
      const isTurned = this.teapotService.doTurnOff(teapot)
      const teapotJson = teapot.toJSON()
      if (isTurned) {
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
}
