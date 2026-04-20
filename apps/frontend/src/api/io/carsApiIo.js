// import initNamespace from '@/utils/initNamespace.js'
import ack from '@/utils/ack.js'
import SocketNamespace from '@/utils/SocketNamespace.js'

// export const carsNs = initNamespace('/cars')

export const carsNs = new SocketNamespace('/cars', 'abcdef')

// ioNamespaces['/cars'].restart()
// ioNamespaces['/cars'].s.on()
// ioNamespaces['/cars'].s.emit()
// ioNamespaces['/cars'].s.open()
// ioNamespaces['/cars'].s.close()
// ioNamespaces['/cars'].switchSession('ffaabbcc')
// ioNamespaces['/cars'].restart()
// ioNamespaces['/cars'].stop()

// ioNamespaces.switchSession('ffaabbcc')
// ioNamespaces.restart()
// ioNamespaces.stop()

carsNs.restart()

export function getAll() {
  return new Promise(res => carsNs.s?.emit('car:getAll', '', '', ack(res)))
}

export function getById(id) {
  return new Promise(res => carsNs.s?.emit('car:getById', id, '', ack(res)))
}

export function add(dto) {
  return new Promise(res => carsNs.s?.emit('car:add', '', dto, ack(res)))
}

export function updateById(id, dto) {
  return new Promise(res => carsNs.s?.emit('car:updateById', id, dto, ack(res)))
}

export function removeById(id) {
  return new Promise(res => carsNs.s?.emit('car:removeById', id, '', ack(res)))
}
