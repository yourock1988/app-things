export default function on(socket, eventName, handler) {
  const ctx = {
    socket,
    eventName,
  }
  socket.on(eventName, (...args) => {
    handler(ctx, ...args)
  })
}
