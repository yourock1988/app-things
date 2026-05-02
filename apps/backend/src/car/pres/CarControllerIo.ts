import { Server, Namespace } from 'socket.io'
import CarService from '../domain/CarService.js'
import Car from '../domain/Car.js'

export default class CarControllerIo {
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
    const cars = this.carService.getAll()
    ack?.(null, cars)
  }

  getById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const car = this.carService.getById(+id)
    if (car) ack?.(null, car)
    else ack?.(404)
  }

  add(ctx, args) {
    const ack = args.at(2)
    const dto = args.at(1)
    const car = this.carService.add(dto).toJSON()
    ack?.(null, car)
    ctx.socket.broadcast.emit('bc-cl:car:added', car)
    // this.io.emit('bc-sv:car:added', car)
  }

  updateById(ctx, args) {
    const { id } = args.at(0)
    const dto = args.at(1)
    const ack = args.at(2)
    const car = this.carService.updateById(id, dto)
    if (car) {
      const carJson = car.toJSON()
      ack?.(null, carJson)
      ctx.socket.broadcast.emit('bc-cl:car:updated', carJson)
    } else {
      ack?.(404)
    }
  }

  removeById(ctx, args) {
    const { id } = args.at(0)
    const ack = args.at(2)
    const hasBeenExists = this.carService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      ctx.socket.broadcast.emit('bc-cl:car:deleted', id)
    } else {
      ack?.(404)
    }
  }
}
