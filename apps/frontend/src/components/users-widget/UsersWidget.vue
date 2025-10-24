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

  computed: {},

  async created() {
    this.users = await getUsers()
  },

  methods: {
    // handleRefresh() {
    //   console.log('REFRESH')
    // },
  },
}
</script>

<template>
  <div id="w">
    {{ users }}

    <UsersUpdater />

    <UsersSubmitter @user-submitted="users.push($event)" />

    <div class="card table-wrapper">
      <table id="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Никнейм</th>
            <th>Пароль</th>
            <th>Email</th>
            <th>Баланс</th>
            <th>Онлайн</th>
            <th>Действия</th>
          </tr>
        </thead>

        <UsersList v-model="users" />
      </table>
    </div>
  </div>
</template>
