import { Server, Socket } from 'socket.io'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import CarService from '../../core/services/CarService.js'
import SocketError from '../../errors/SocketError.js'
import Car from '../../core/models/Car.js'
import { TAckFn } from '../../types/TAckFn.js'

export default class CarControllerIo {
  constructor(readonly carService: CarService, readonly io: Server) {
    carService.on('bc-sv:car:added', (car: Car) => io.emit('car:added', car))
  }

  getAll(_: string, ack: TAckFn<Car[]>) {
    const cars = this.carService.getAll()
    ack?.(null, cars)
  }

  getById(id: number, ack: TAckFn<Car | null>) {
    const car = this.carService.getById(+id)
    if (car) ack?.(null, car)
    else ack?.(new SocketError(404, 'getById', `car id ${id} not exists`))
  }

  add(dto: TCarAddDto, ack: TAckFn<Car>, socket: Socket) {
    const car = this.carService.add(dto)
    ack?.(null, car)
    socket.broadcast.emit('bc-cl:car:added', car)
    // this.io.emit('bc-sv:car:added', car)
  }

  updateById(
    id: number,
    dto: TCarUpdateDto,
    ack: TAckFn<Car | null>,
    socket: Socket
  ) {
    const car = this.carService.updateById(id, dto)
    if (car) {
      ack?.(null, car)
      socket.broadcast.emit('bc-cl:car:updated', car)
    } else {
      ack?.(new SocketError(404, 'updateById', `car id ${id} not exists`))
    }
  }

  removeById(id: number, ack: TAckFn<never>, socket: Socket) {
    const hasBeenExists = this.carService.removeById(id)
    if (hasBeenExists) {
      ack?.(null)
      socket.broadcast.emit('bc-cl:car:deleted', id)
    } else {
      ack?.(new SocketError(404, 'removeById', `car id ${id} not exists`))
    }
  }
}
