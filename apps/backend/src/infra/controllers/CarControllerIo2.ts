import { Server, Namespace } from 'socket.io'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import CarService from '../../core/services/CarService.js'
import SocketError from '../../SocketError.js'
import Car from '../../core/models/Car.js'
import { TAckFn } from '../../TAckFn.js'

export default class CarControllerIo2 {
  constructor(
    readonly carService: CarService,
    private carNamespace: Namespace | null = null,
    private io: Server | null = null,
  ) {
    carService.on('bc-sv:car:added', (car: Car) => io?.emit('car:added', car))
  }

  public init(carNamespace: Namespace, io: Server) {
    this.carNamespace = carNamespace
    this.io = io
  }

  getAll(ctx, _: string, ack: TAckFn<Car[]>) {
    global.console.log('>>>+all', ctx.eventName)
    const cars = this.carService.getAll()
    ack?.(null, cars)
  }

  getById(ctx, id: number, ack: TAckFn<Car | null>) {
    global.console.log('>>>+get', ctx.eventName)
    const car = this.carService.getById(+id)
    if (car) ack?.(null, car)
    else ack?.(new SocketError(404, 'getById', `car id ${id} not exists`))
  }

  add(ctx, dto: TCarAddDto, ack: TAckFn<Car>) {
    global.console.log('>>>+add', ctx.eventName)
    const car = this.carService.add(dto)
    ack?.(null, car)
    ctx.socket.broadcast.emit('bc-cl:car:added', car)
    // this.io.emit('bc-sv:car:added', car)
  }

  updateById(ctx, id: number, dto: TCarUpdateDto, ack: TAckFn<Car | null>) {
    global.console.log('>>>+upd', ctx.eventName)
    const car = this.carService.updateById(id, dto)
    if (car) {
      ack?.(null, car)
      ctx.socket.broadcast.emit('bc-cl:car:updated', car)
    } else {
      ack?.(new SocketError(404, 'updateById', `car id ${id} not exists`))
    }
  }

  removeById(ctx, id: number, ack: TAckFn<never>) {
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
