<script>
import socket from '@/api/ws/index.js'
import AppLayout from './components/AppLayout.vue'
import PagePicsum from './pages/PagePicsum.vue'
import PageUsers from './pages/PageUsers.vue'

export default {
  components: {
    AppLayout,
    PagePicsum,
    PageUsers,
  },

  created() {
    socket.connect()
  },
}
</script>

<template>
  <AppLayout :tabs="['users', 'cars', 'tests', 'pics']">
    <router-view v-slot="{ Component }">
      <v-fade-transition hide-on-leave>
        <component :is="Component" />
      </v-fade-transition>
    </router-view>
  </AppLayout>
</template>
