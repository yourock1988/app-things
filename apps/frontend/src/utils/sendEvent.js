import ack from '@/utils/ack.js'

export default function sendEvent(ns, eventName, id = '', dto = '') {
  if (!ns.s || !ns.s.connected) return [{ _errors: ['not-connected'] }]
  return new Promise(res => ns.s?.emit(eventName, id, dto, ack(res)))
}
