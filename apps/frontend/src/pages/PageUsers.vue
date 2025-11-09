<script>
import { mapActions, mapMutations } from 'vuex'
import UsersWidget from '@/components/users-widget/UsersWidget.vue'

export default {
  components: { UsersWidget },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.readUsers())
  },
  beforeRouteLeave(to, from, next) {
    this.RESET_USERS()
    next()
  },

  methods: {
    // eslint-disable-next-line vue/no-unused-properties
    ...mapActions('users', ['readUsers']),

    ...mapMutations('users', ['RESET_USERS']),
  },
}
</script>

<template>
  <div>
    <h3>PAGE USERS</h3>
    <UsersWidget />
  </div>
</template>
