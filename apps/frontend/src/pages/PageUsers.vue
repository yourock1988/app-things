<script>
import { mapActions, mapMutations } from 'vuex'
import UsersWidget from '@/components/users-widget/UsersWidget.vue'

export default {
  components: { UsersWidget },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.readUsers()
      vm.SUBSCRIBE()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.SET_USERS([])
    this.UNSUBSCRIBE()
    next()
  },

  methods: {
    // eslint-disable-next-line vue/no-unused-properties
    ...mapActions('users', ['readUsers']),

    // eslint-disable-next-line vue/no-unused-properties
    ...mapMutations('users', ['SET_USERS', 'UNSUBSCRIBE', 'SUBSCRIBE']),
  },
}
</script>

<template>
  <div>
    <h3>PAGE USERS</h3>
    <UsersWidget />
  </div>
</template>
