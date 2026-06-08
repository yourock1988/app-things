export type TTeapotVo = {
  id: number
  temperature: number
  accountId: number
  ongoing: 'idle' | 'boiling'
  isOnline: boolean
}
