import socket from '@/api/ws/index.js'

export default store => {
  store.subscribe(mutation => {
    console.log('plugin Мутация:', mutation.type, mutation.payload)
    if (mutation.type === 'users/SET_USERS') {
      console.log('PLUGIN SUBSCRIBE SOCKET')
      socket.on('bc-cl:user:added', data =>
        store.commit('users/ADD_USER', data)
      )
      socket.on('bc-cl:user:updated', ({ id, ...dto }) =>
        store.commit('users/UPDATE_USER_BY_ID', { id, dto })
      )
      socket.on('bc-cl:user:deleted', id =>
        store.commit('users/REMOVE_USER_BY_ID', id)
      )
    }
    if (mutation.type === 'users/RESET_USERS') {
      console.log('PLUGIN UNSUBSCRIBE SOCKET')
      socket.removeAllListeners('bc-cl:user:added')
      socket.removeAllListeners('bc-cl:user:updated')
      socket.removeAllListeners('bc-cl:user:deleted')
    }
  })
}
