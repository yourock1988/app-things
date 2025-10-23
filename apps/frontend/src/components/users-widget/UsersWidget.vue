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
          nickname: 'youri',
          password: 'qwe321',
          email: 'youri@mail.com',
          money: 33,
          isOnline: false,
        },
      ],
    }
  },

  methods: {
    handleRefresh() {
      console.log('REFRESH')
    },
  },
}
</script>

<template>
  {{ users }}

  <div id="w">
    <UsersUpdater @click="console.log(users)" />

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

        <UsersList :users @users-updated="users = $event" />
      </table>
    </div>
  </div>
</template>
