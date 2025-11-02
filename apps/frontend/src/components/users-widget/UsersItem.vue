<script>
import { mapActions } from 'vuex'

import EditableCellButtons from '../EditableCellButtons.vue'
import EditableCellText from '../EditableCellText.vue'

export default {
  components: { EditableCellText, EditableCellButtons },

  props: ['user'],

  emits: ['user-edited', 'user-deleted-id'],

  data() {
    return {
      localUser: this.parseUser(this.user),
    }
  },

  watch: {
    user: {
      deep: true,
      handler(val) {
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
  },
}
</script>

<template>
  <tr>
    <td data-label="id">{{ user.id }}</td>
    <td data-label="id">{{ user.nickname }}</td>
    <EditableCellText v-model="localUser.password" caption="password" />
    <td data-label="id">{{ user.email }}</td>
    <EditableCellText v-model.number="localUser.money" caption="money" />
    <td data-label="id">{{ user.isOnline }}</td>
    <EditableCellButtons
      @edit="updateUserById({ id: user.id, user: localUser })"
      @delete="deleteUserById(user.id)"
    />
  </tr>
</template>
