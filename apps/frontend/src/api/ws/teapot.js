import EventEmitter from 'eventemitter3'
import socket from './index.js'

const emitter = new EventEmitter()
let awaitingCounter = 0

function commitServerState(serverState, isAck) {
  if (isAck && awaitingCounter > 0) return
  emitter.emit('update', serverState)
}

function makeEvent(eventName) {
  awaitingCounter += 1
  return new Promise(res => socket.emit(eventName, '_', makeAck(res)))
}

function makeAck(res) {
  return (err, data) => {
    awaitingCounter -= 1
    if (err) {
      return res([err.details])
    }
    return res([null, data])
  }
}

export function subscribe() {
  socket.on('bc-sv:teapot-ready', commitServerState)
  socket.on('bc-cl:teapot-turned_on', commitServerState)
  socket.on('bc-cl:teapot-turned_off', commitServerState)
  socket.on('bc-cl:teapot-drained', commitServerState)
  return emitter
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
