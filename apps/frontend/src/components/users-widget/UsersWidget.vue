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

  computed: {},

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
