<script>
import UsersList from './UsersList.vue'
import UsersSubmitter from './UsersSubmitter.vue'
import UsersUpdater from './UsersUpdater.vue'

export default {
  components: { UsersSubmitter, UsersList, UsersUpdater },

  data() {
    return {
      createdUser: {
        nickname: '',
        password: '',
        email: '',
        money: 0,
        isOnline: false,
      },
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
    handleAdd(e) {
      e.preventDefault()
      console.log(e.target)
      const data = Object.fromEntries(new FormData(e.target).entries())
      data.money = +data.money
      data.isOnline = !!data.isOnline
      console.log('ADD', data)
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
  <div id="w">
    <UsersUpdater />

    <UsersSubmitter />

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
