/* eslint-disable no-param-reassign */

export default function on(socket, eventName, handler) {
  const ctx = {
    socket,
    eventName,
  }
  socket.on(eventName, (...args) => {
    args[0] = { id: args[0] }
    handler(ctx, args)
  })
}
