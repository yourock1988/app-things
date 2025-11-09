<script>
import UsersWidget from './components/users-widget/UsersWidget.vue'
import socket from './api/ws/index.js'

export default {
  components: { UsersWidget },

  created() {
    socket.connect()
  },
}
</script>

<template>
  <div>
    <h2>APP</h2>
    <div>
      <RouterLink to="/">Главная</RouterLink> |
      <RouterLink to="/users">Пользователи</RouterLink> |
      <RouterLink to="/cars">Автомобили</RouterLink> |
      <RouterLink to="/tests">Тесты</RouterLink>
    </div>
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <KeepAlive>
          <Component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>

<style>
a {
  color: dodgerblue;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
