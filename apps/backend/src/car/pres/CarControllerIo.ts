import type { Server, Namespace, Socket } from 'socket.io'
import type CarService from '../domain/CarService.ts'
import type { TCarAddDto, TCarUpdateDto } from '../domain/TCarDtos.ts'
// import type Car from '../domain/Car.ts'

type Tctx = {
  socket: Socket
  eventName: string
}

type Targs<Tdto = undefined> = [
  { id: number },
  Tdto,
  (err: null | number, data?: any) => void,
]

export default class CarControllerIo {
  private carNamespace: Namespace | null = null

  private io: Server | null = null

  private carService: CarService

  constructor(carService: CarService) {
    this.carService = carService
    // carService.on('bc-sv:car:added', (car: Car) =>
    //   this.io?.emit('car:added', car),
    // )
  }

  init(carNamespace: Namespace, io: Server): void {
    this.carNamespace = carNamespace
    this.io = io
    this.io.to('room-101').emit('foo', 'bar')
    this.carNamespace.emit('foo', 'bar')
  }

  getAll(_: unknown, args: Targs): void {
    const [, , ack] = args
    const cars = this.carService.getAll()
    ack?.(null, cars)
  }

  getById(_: unknown, args: Targs): void {
    const [{ id }, , ack] = args
    const car = this.carService.getById(+id)
    if (car) ack?.(null, car)
    else ack?.(404)
  }

  add(ctx: Tctx, args: Targs<TCarAddDto>): void {
    const [, dto, ack] = args
    const car = this.carService.add(dto).toJSON()
    ack?.(null, car)
    ctx.socket.broadcast.emit('bc-cl:car:added', car)
    // this.io.emit('bc-sv:car:added', car)
  }

  updateById(ctx: Tctx, args: Targs<TCarUpdateDto>): void {
    const [{ id }, dto, ack] = args
    const car = this.carService.updateById(id, dto)
    if (car) {
      const carJson = car.toJSON()
      ack?.(null, carJson)
      ctx.socket.broadcast.emit('bc-cl:car:updated', carJson)
    } else {
      ack?.(404)
    }
  }

  removeById(ctx: Tctx, args: Targs): void {
    const [{ id }, , ack] = args
    const hasBeenExists = this.carService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      ctx.socket.broadcast.emit('bc-cl:car:deleted', id)
    } else {
      ack?.(404)
    }
  }
}
