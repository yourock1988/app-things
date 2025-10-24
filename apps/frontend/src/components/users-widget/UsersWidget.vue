<script>
import UsersList from './UsersList.vue'
import UsersSubmitter from './UsersSubmitter.vue'
import UsersUpdater from './UsersUpdater.vue'

import { getUsers } from '../../api/users.js'

export default {
  components: { UsersSubmitter, UsersList, UsersUpdater },

  data() {
    return {
      users: [],
    }
  },

  computed: {
    userKeys() {
      return Object.keys(this.users.at(0) ?? {}).map(u => u.toUpperCase())
    },
  },

  created() {
    this.handleRefresh()
  },

  methods: {
    async handleRefresh() {
      this.users = await getUsers()
    },
  },
}
</script>

<template>
  <div id="w">
    <UsersUpdater @refresh="handleRefresh" />

    <UsersSubmitter @user-submitted="users.push($event)" />

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
