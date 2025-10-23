<script>
import randId from '../../functions/randId.js'

export default {
  emits: ['user-submitted'],

  data() {
    return {
      localUser: this.initUser(),
    }
  },

  methods: {
    initUser() {
      return {
        id: randId(),
        nickname: '',
        password: '',
        email: '',
        money: 0,
        isOnline: false,
      }
    },

    handleSubmit() {
      this.$emit('user-submitted', { ...this.localUser })
      this.localUser = this.initUser()
    },
  },
}
</script>

<template>
  <div class="card user-add-form-container">
    <h2>Новый пользователь</h2>
    <form @submit.prevent="handleSubmit" id="elFormAddUser">
      <div class="form-grid">
        <div class="form-group">
          <label for="new-nickname">Никнейм</label>
          <input
            type="text"
            id="new-nickname"
            name="nickname"
            placeholder="Введите никнейм"
            required
            v-model="localUser.nickname"
          />
        </div>
        <div class="form-group">
          <label for="new-password">Пароль</label>
          <input
            type="password"
            id="new-password"
            name="password"
            placeholder="Пароль"
            required
            v-model="localUser.password"
          />
        </div>
        <div class="form-group">
          <label for="new-email">Email</label>
          <input
            type="email"
            id="new-email"
            name="email"
            placeholder="example@mail.com"
            required
            v-model="localUser.email"
          />
        </div>
        <div class="form-group">
          <label for="new-money">Баланс ($)</label>
          <input
            type="number"
            id="new-money"
            name="money"
            value="0"
            min="0"
            v-model="localUser.money"
          />
        </div>
        <div class="form-group checkbox-group">
          <input
            type="checkbox"
            id="new-is-online"
            name="isOnline"
            v-model="localUser.isOnline"
          />
          <label for="new-is-online">Пользователь онлайн</label>
        </div>
      </div>
      <button type="submit" class="control-btn primary">
        <span class="icon">➕</span> Добавить пользователя
      </button>
    </form>
  </div>
</template>
