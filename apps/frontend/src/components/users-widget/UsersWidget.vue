<script>
import { mapState, mapActions } from 'vuex'

import UsersSubmitter from './UsersSubmitter.vue'
import UsersUpdater from './UsersUpdater.vue'
import UsersList from './UsersList.vue'

export default {
  components: { UsersSubmitter, UsersList, UsersUpdater },

  computed: {
    ...mapState('users', ['users']),

    userKeys() {
      return Object.keys(this.users.at(0) ?? {}).map(u => u.toUpperCase())
    },
  },

  created() {
    // подключатся к socket-io серверу при криэйтеде
  },

  methods: {
    ...mapActions('users', [
      'readUsers',
      'createUser',
      'deleteUserById',
      'updateUserById',
    ]),
  },
}
</script>

<template>
  <div id="w">
    <UsersUpdater @refresh="readUsers" />

    <UsersSubmitter @user-submitted="createUser" />

    <button @click="deleteUserById(42)">WTF DELETE</button>

    <button
      @click="updateUserById({ id: 111, user: { money: 0, password: 'xxxx' } })"
    >
      WTF UPDATE 0
    </button>

    <button @click="updateUserById({ id: 42, user: {} })">WTF UPDATE 1</button>

    <button
      @click="updateUserById({ id: 42, user: { money: 0, password: 'xxxx' } })"
    >
      WTF UPDATE 2
    </button>

    <button
      @click="updateUserById({ id: 42, user: { money: 0, password: 'xxxxx' } })"
    >
      WTF UPDATE 3
    </button>

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
