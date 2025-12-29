import socket from './index.js'
import ack from './ack.js'

export function subscribe({ turnOn, turnOff, turnDrain }) {
  socket.on('bc-sv:teapot-ready', data => turnOff(data))
  socket.on('bc-cl:teapot-turned_on', data => turnOn(data))
  socket.on('bc-cl:teapot-turned_off', data => turnOff(data))
  socket.on('bc-cl:teapot-turned_drain', data => turnDrain(data))
}

export function sendShow() {
  return new Promise(res => socket.emit('cl:teapot-show', '_', ack(res)))
}

export function sendTurnOn() {
  return new Promise(res => socket.emit('cl:teapot-turn_on', '_', ack(res)))
}

export function sendTurnOff() {
  return new Promise(res => socket.emit('cl:teapot-turn_off', '_', ack(res)))
}

export function sendDrain() {
  return new Promise(res => socket.emit('cl:teapot-turn_drain', '_', ack(res)))
}
