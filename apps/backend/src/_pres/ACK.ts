export default function (ctx, args: any[], next: any) {
  const ack = args?.at(2)
  if (typeof ack !== 'function') {
    console.log('ack-is-not-a-func')
    ctx.socket.disconnect()
  } else {
    next()
  }
}
