<script>
import { mapActions } from 'vuex'
import FormGroup from '../FormGroup.vue'

export default {
  components: { FormGroup },

  data() {
    return {
      localUser: this.initUser(),
    }
  },

  methods: {
    ...mapActions('users', ['createUser']),

    initUser() {
      return {
        nickname: 'Foobar',
        password: 'qwerty1',
        email: 'foo@bar.io',
      }
    },

    handleSubmit() {
      this.createUser({ ...this.localUser })
      this.localUser = this.initUser()
    },
  },
}
</script>

<template>
  <div class="card user-add-form-container">
    <h2>Добавить пользователя</h2>
    <form id="elFormAddUser" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormGroup v-model="localUser.nickname" placeholder="Ваш никнейм" />
        <FormGroup v-model="localUser.password" placeholder="Ваш пароль" />
        <FormGroup
          v-model="localUser.email"
          placeholder="Ваш email"
          type="email"
        />
      </div>
      <button type="submit" class="control-btn primary">
        <span class="icon">➕</span> Добавить
      </button>
    </form>
  </div>
</template>
