import type { TMwareIoCtx } from './TMwareIo.ts'

export default function (ctx: TMwareIoCtx, args: any[], next: any): void {
  const ack = args?.at(2)
  if (typeof ack !== 'function') {
    console.log('ack-is-not-a-func')
    ctx.socket.disconnect()
  } else {
    next()
  }
}
