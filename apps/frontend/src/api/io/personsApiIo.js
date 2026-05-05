import { ioNamespaces } from '@/utils/IoNamespaces.js'
import sendEvent from '@/utils/sendEvent.js'

export const personsNs = ioNamespaces.add('/persons')

export function getAll() {
  return sendEvent(personsNs, 'person:getAll')
}
export function getById(id) {
  return sendEvent(personsNs, 'person:getById', id)
}
export function add(dto) {
  return sendEvent(personsNs, 'person:add', '', dto)
}
export function updateById(id, dto) {
  return sendEvent(personsNs, 'person:updateById', id, dto)
}
export function removeById(id) {
  return sendEvent(personsNs, 'person:removeById', id)
}
