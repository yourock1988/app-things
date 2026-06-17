import type { TMwareIo } from './TMwareIo.ts'

// eslint-disable-next-line no-restricted-syntax
const ACK: TMwareIo = function (ctx, args, next) {
  const ack = args?.at(2)
  if (typeof ack !== 'function') {
    global.console.log('ack-is-not-a-func')
    ctx.socket.disconnect()
    next({ message: 'ack-is-not-a-func', data: 400 })
  } else {
    next()
  }
}

export default ACK
