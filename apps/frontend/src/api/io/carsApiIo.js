import ack from '@/utils/ack.js'
import { ioNamespaces } from '@/utils/IoNamespaces.js'

export const carsNs = ioNamespaces.add('/cars')

export function getAll() {
  if (!carsNs.s || !carsNs.s.connected) return [{ _errors: ['not-connected'] }]
  return new Promise(res => carsNs.s?.emit('car:getAll', '', '', ack(res)))
}

export function getById(id) {
  if (!carsNs.s || !carsNs.s.connected) return [{ _errors: ['not-connected'] }]
  return new Promise(res => carsNs.s?.emit('car:getById', id, '', ack(res)))
}

export function add(dto) {
  if (!carsNs.s || !carsNs.s.connected) return [{ _errors: ['not-connected'] }]
  return new Promise(res => carsNs.s?.emit('car:add', '', dto, ack(res)))
}

export function updateById(id, dto) {
  if (!carsNs.s || !carsNs.s.connected) return [{ _errors: ['not-connected'] }]
  return new Promise(res => carsNs.s?.emit('car:updateById', id, dto, ack(res)))
}

export function removeById(id) {
  if (!carsNs.s || !carsNs.s.connected) return [{ _errors: ['not-connected'] }]
  return new Promise(res => carsNs.s?.emit('car:removeById', id, '', ack(res)))
}
