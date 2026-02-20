import { Server, Namespace } from 'socket.io'
// import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import CarService from '../../core/services/CarService.js'
import SocketError from '../../SocketError.js'
import Car from '../../core/models/Car.js'
// import { TAckFn } from '../../TAckFn.js'

export default class CarControllerIo2 {
  constructor(
    readonly carService: CarService,
    private carNamespace: Namespace | null = null,
    private io: Server | null = null,
  ) {
    carService.on('bc-sv:car:added', (car: Car) => io?.emit('car:added', car))
  }

  init(carNamespace: Namespace, io: Server) {
    this.carNamespace = carNamespace
    this.io = io
  }

  getAll(ctx, args) {
    const ack = args.at(2)
    global.console.log('>>>+all', ctx.eventName)
    const cars = this.carService.getAll()
    ack?.(null, cars)
  }

  getById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    global.console.log('>>>+get', ctx.eventName)
    const car = this.carService.getById(+id)
    if (car) ack?.(null, car)
    else ack?.(new SocketError(404, 'getById', `car id ${id} not exists`))
  }

  add(ctx, args) {
    const ack = args.at(2)
    const dto = args.at(1)
    global.console.log('>>>+add', ctx.eventName)
    const car = this.carService.add(dto)
    ack?.(null, car)
    ctx.socket.broadcast.emit('bc-cl:car:added', car)
    // this.io.emit('bc-sv:car:added', car)
  }

  updateById(ctx, args) {
    const { id } = args.at(0)
    const dto = args.at(1)
    const ack = args.at(2)
    global.console.log('>>>+upd', ctx.eventName)
    const car = this.carService.updateById(id, dto)
    if (car) {
      ack?.(null, car)
      ctx.socket.broadcast.emit('bc-cl:car:updated', car)
    } else {
      ack?.(new SocketError(404, 'updateById', `car id ${id} not exists`))
    }
  }

  removeById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    global.console.log('>>>+del', ctx.eventName)
    const hasBeenExists = this.carService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      ctx.socket.broadcast.emit('bc-cl:car:deleted', id)
    } else {
      ack?.(new SocketError(404, 'removeById', `car id ${id} not exists`))
    }
  }
}
