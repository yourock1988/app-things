<script>
import FormGroup from '../FormGroup.vue'

export default {
  components: { FormGroup },

  emits: ['user-submitted'],

  data() {
    return {
      localUser: this.initUser(),
    }
  },

  methods: {
    initUser() {
      return {
        nickname: 'foo',
        password: 'bar',
        email: 'foo@bar',
        money: 321,
        isOnline: true,
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
    <form id="elFormAddUser" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormGroup v-model="localUser.nickname" placeholder="Ваш никнейм" />
        <FormGroup v-model="localUser.password" placeholder="Ваш пароль" />
        <FormGroup
          v-model="localUser.email"
          placeholder="Ваш email"
          type="email"
        />
        <FormGroup
          v-model.number="localUser.money"
          placeholder="Ваш баланс ($)"
          type="number"
        />
        <FormGroup
          v-model="localUser.isOnline"
          placeholder="Вы онлайн ?"
          type="checkbox"
        />
      </div>
      <button type="submit" class="control-btn primary">
        <span class="icon">➕</span> Добавить пользователя
      </button>
    </form>
  </div>
</template>
