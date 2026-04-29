import ack from '@/utils/ack.js'
import processErrorIo from './processErrorIo.js'

export default async function sendEvent(ns, eventName, id = '', dto = '') {
  if (!ns.s || !ns.s.connected) return [{ _errors: ['not-connected'] }]
  const [err, data] = await new Promise(res =>
    ns.s?.emit(eventName, id, dto, ack(res)),
  )
  if (err) return [processErrorIo(err)]
  return [null, data]
}
