<script>
import { mapActions } from 'vuex'
import TurboBtn from '../../ui/TurboBtn.vue'
import TurboTd from '../../ui/TurboTd.vue'

export default {
  components: { TurboTd, TurboBtn },

  props: ['user'],

  data() {
    return {
      localUser: this.parseUser(this.user),
      isEditing: false,
    }
  },

  computed: {
    err() {
      return this.user.err ?? null
    },
  },

  watch: {
    user: {
      deep: true,
      handler(val) {
        if (val.err || this.isEditing) return
        this.localUser = this.parseUser(val)
      },
    },
  },

  methods: {
    ...mapActions('users', ['updateUserById', 'deleteUserById']),

    parseUser(user) {
      const { money, password } = user
      return { money, password }
    },
    async save() {
      this.isEditing = false
      await this.updateUserById({
        id: this.user.id,
        user: { ...this.localUser },
      })
      if (this.user.err) {
        this.isEditing = true
      }
    },
    cancel() {
      this.localUser = this.parseUser(this.user)
      this.isEditing = false
    },
  },
}
</script>

<template>
  <tr>
    <TurboTd :model-value="user" field="id" />
    <TurboTd :model-value="user" field="nickname" />
    <TurboTd v-model="localUser" field="password" :err :is-editing />
    <TurboTd :model-value="user" field="email" />
    <TurboTd v-model.number="localUser" field="money" :err :is-editing />
    <TurboTd :model-value="user" field="isOnline" />
    <td class="d-flex align-center justify-space-around">
      <template v-if="isEditing">
        <TurboBtn kind="cancel" @click="cancel" />
        <TurboBtn kind="save" @click="save" />
      </template>
      <template v-else>
        <TurboBtn kind="edit" @click="isEditing = true" />
        <TurboBtn kind="delete" @click="deleteUserById(user.id)" />
      </template>
    </td>
  </tr>
</template>
