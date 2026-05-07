/* eslint-disable no-param-reassign */

import CoR from './CoR.js'

export default function listen(socket) {
  return {
    on(eventName, ...handlers) {
      const ctx = {
        socket,
        eventName,
      }
      socket.on(eventName, (...args) => {
        args[0] = { id: args[0] }
        CoR(...handlers)(ctx, args)
      })
      return this
    },
  }
}
