<script>
import UsersWidget from './components/users-widget/UsersWidget.vue'

export default {
  components: { UsersWidget },
}
</script>

<template>
  <UsersWidget />
  <!-- <RouterView v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <KeepAlive>
        <Component :is="Component" :key="route.path" />
      </KeepAlive>
    </Transition>
  </RouterView> -->
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
