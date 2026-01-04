import socket from './index.js'

let awaitingCounter = 0
let commitServerState

// const emitter =

function makeAck(res) {
  return (err, data) => {
    awaitingCounter -= 1
    if (err) {
      return res([err.details])
    }
    return res([null, data])
  }
}

function makeCommitter(self) {
  return (serverState, isAck) => {
    // console.log('isAsk :>> ', isAck, awaitingCounter)
    if (isAck && awaitingCounter > 0) return
    self.temperature = serverState.temperature
    if (serverState.ongoing === 'idle') {
      if (self.ongoing === 'idle') {
        //
      }
      if (self.ongoing === 'boiling') {
        self.turnOff()
        globalThis.console.log('sync turnOff()')
      }
    }
    if (serverState.ongoing === 'boiling') {
      if (self.ongoing === 'boiling') {
        //
      }
      if (self.ongoing === 'idle') {
        self.turnOn()
        globalThis.console.log('sync turnOn()')
      }
    }
  }
}

export function subscribe(self) {
  commitServerState = makeCommitter(self)
  socket.on('bc-sv:teapot-ready', commitServerState)
  socket.on('bc-cl:teapot-turned_on', commitServerState)
  socket.on('bc-cl:teapot-turned_off', commitServerState)
  socket.on('bc-cl:teapot-drained', commitServerState)
}

function makeEvent(eventName) {
  awaitingCounter += 1
  return new Promise(res => socket.emit(eventName, '_', makeAck(res)))
}

export async function sendShow() {
  const [err, data] = await makeEvent('cl:teapot-show')
  if (!err) commitServerState(data, false)
}

export async function sendTurnOn() {
  const [err, data] = await makeEvent('cl:teapot-turn_on')
  if (!err) commitServerState(data, true)
}

export async function sendTurnOff() {
  const [err, data] = await makeEvent('cl:teapot-turn_off')
  if (!err) commitServerState(data, true)
}

export async function sendDrain() {
  const [err, data] = await makeEvent('cl:teapot-drain')
  if (!err) commitServerState(data, true)
}
