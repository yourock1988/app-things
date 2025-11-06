<script>
import { mapState, mapActions } from 'vuex'

import UsersSubmitter from './UsersSubmitter.vue'
import UsersUpdater from './UsersUpdater.vue'
import UsersList from './UsersList.vue'

export default {
  components: { UsersSubmitter, UsersList, UsersUpdater },

  computed: {
    ...mapState('users', ['users', 'err']),

    userKeys() {
      return Object.keys(this.users.at(0) ?? {}).map(u => u.toUpperCase())
    },
  },

  mounted() {
    console.log('mounted')
  },

  unmounted() {
    console.log('unmounted')
  },

  methods: {
    ...mapActions('users', ['readUsers', 'createUser']),
  },
}
</script>

<template>
  <div id="w">
    <UsersUpdater @refresh="readUsers" />

    <UsersSubmitter @user-submitted="createUser" />

    <h3>{{ err }}</h3>

    <div class="card table-wrapper">
      <table id="user-table">
        <thead>
          <tr>
            <th v-for="userKey of userKeys" :key="userKey">{{ userKey }}</th>
            <th></th>
          </tr>
        </thead>

        <UsersList v-model="users" />
      </table>
    </div>
  </div>
</template>
