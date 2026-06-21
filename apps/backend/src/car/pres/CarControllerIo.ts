import type { Server, Namespace } from 'socket.io'
import type { TMwareIo } from '../../_pres/TMwareIo.ts'
import type CarService from '../domain/CarService.ts'
import type { TCarAddDto, TCarUpdateDto } from '../domain/TCarDtos.ts'

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

  getAll: TMwareIo = (_, args) => {
    const [, , ack] = args
    const cars = this.carService.getAll()
    ack?.(null, cars)
  }

  getById: TMwareIo = (_, args) => {
    const [{ id }, , ack] = args
    const car = this.carService.getById(+id)
    if (car) ack?.(null, car)
    else ack?.(404)
  }

  add: TMwareIo<TCarAddDto> = (ctx, args) => {
    const [, dto, ack] = args
    const car = this.carService.add(dto).toJSON()
    ack?.(null, car)
    ctx.socket.broadcast.emit('bc-cl:car:added', car)
    // this.io.emit('bc-sv:car:added', car)
  }

  updateById: TMwareIo<TCarUpdateDto> = (ctx, args) => {
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

  removeById: TMwareIo = (ctx, args) => {
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
