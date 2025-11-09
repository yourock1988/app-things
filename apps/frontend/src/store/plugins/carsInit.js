import socket from '@/api/ws/index.js'

export default store => {
  store.subscribe(mutation => {
    console.log('plugin Мутация:', mutation.type, mutation.payload)
    if (mutation.type === 'cars/SET_CARS') {
      console.log('PLUGIN SUBSCRIBE SOCKET')
      socket.on('bc-cl:car:added', data => store.commit('cars/ADD_CAR', data))
      socket.on('bc-cl:car:updated', ({ id, ...dto }) =>
        store.commit('cars/UPDATE_CAR_BY_ID', { id, dto })
      )
      socket.on('bc-cl:car:deleted', id =>
        store.commit('cars/REMOVE_CAR_BY_ID', id)
      )
    }
    if (mutation.type === 'cars/RESET_CARS') {
      console.log('PLUGIN UNSUBSCRIBE SOCKET')
      socket.removeAllListeners('bc-cl:car:added')
      socket.removeAllListeners('bc-cl:car:updated')
      socket.removeAllListeners('bc-cl:car:deleted')
    }
  })
}
