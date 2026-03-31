<script>
import AppLayout from '@/components/AppLayout.vue'

export default {
  components: {
    AppLayout,
  },

  computed: {
    tabs() {
      return this.$router
        .getRoutes()
        .filter(r => r.path)
        .map(r => r.path)
    },
  },
}
</script>

<template>
  <AppLayout :tabs>
    <router-view v-slot="{ Component }">
      <v-fade-transition mode="out-in" :duration="50">
        <component :is="Component" />
      </v-fade-transition>
    </router-view>
  </AppLayout>
</template>
