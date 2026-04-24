import { ioNamespaces } from '@/utils/IoNamespaces.js'
import sendEvent from '@/utils/sendEvent.js'

export const usersNs = ioNamespaces.add('/users')

export function getAll() {
  return sendEvent(usersNs, 'user:getAll')
}

export function getById(id) {
  return sendEvent(usersNs, 'user:getById', id)
}

export function add(dto) {
  return sendEvent(usersNs, 'user:add', '', dto)
}

export function updateById(id, dto) {
  return sendEvent(usersNs, 'user:updateById', id, dto)
}

export function removeById(id) {
  return sendEvent(usersNs, 'user:removeById', id)
}
