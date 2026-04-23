import { ioNamespaces } from '@/utils/IoNamespaces.js'
import sendEvent from '@/utils/sendEvent.js'

export const carsNs = ioNamespaces.add('/cars')

export function getAll() {
  return sendEvent(carsNs, 'car:getAll')
}

export function getById(id) {
  return sendEvent(carsNs, 'car:getById', id)
}

export function add(dto) {
  return sendEvent(carsNs, 'car:add', '', dto)
}

export function updateById(id, dto) {
  return sendEvent(carsNs, 'car:updateById', id, dto)
}

export function removeById(id) {
  return sendEvent(carsNs, 'car:removeById', id)
}
