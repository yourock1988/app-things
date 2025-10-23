<script>
import UsersList from './UsersList.vue'
import UsersSubmitter from './UsersSubmitter.vue'
import UsersUpdater from './UsersUpdater.vue'

export default {
  components: { UsersSubmitter, UsersList, UsersUpdater },

  data() {
    return {
      users: [
        {
          id: 111,
          nickname: 'YouROCK',
          password: 'qwerty123',
          email: 'yourock88@super-mail.com',
          money: 42,
          isOnline: false,
        },
        {
          id: 112,
          nickname: 'YouROCK',
          password: 'qwerty123',
          email: 'yourock88@super-mail.com',
          money: 42,
          isOnline: false,
        },
      ],
    }
  },

  methods: {
    handleRefresh() {
      console.log('REFRESH')
    },
    handleEdit(user) {
      console.log('EDIT', user)
    },
    handleDelete(user) {
      console.log('DELETE', user)
    },
  },
}
</script>

<template>
  {{ users }}

  <div id="w">
    <UsersUpdater />

    <UsersSubmitter @user-submitted="this.users.push($event)" />

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

        <UsersList :users />
      </table>
    </div>
  </div>
</template>
