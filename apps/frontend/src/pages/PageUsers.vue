<script>
import { mapActions, mapMutations } from 'vuex'
import UsersSubmitter from '@/components/users-widget/UsersSubmitter.vue'
import UsersList from '@/components/users-widget/UsersList.vue'

export default {
  components: { UsersSubmitter, UsersList },

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
    <div>
      <UsersSubmitter />
      <UsersList />
    </div>
  </div>
</template>
