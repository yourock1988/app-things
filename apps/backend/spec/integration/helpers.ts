export const makeResetTable = (table, seed) => () =>
  table.splice(0, Infinity, ...structuredClone(seed))

export function clSend(socket, ...args) {
  return new Promise((resolve, reject) => {
    socket.emit(...args, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

export function clListen(socket, eventName, ms = 1000) {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      socket.off(eventName, resolve)
      resolve('timed-out')
    }, ms)
    socket.once(eventName, data => {
      clearTimeout(timer)
      resolve(data)
    })
  })
}
