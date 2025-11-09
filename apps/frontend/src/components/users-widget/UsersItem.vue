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
    <td>{{ user.id }}</td>
    <td>{{ user.nickname }}</td>
    <EditableCellText
      v-model="localUser.password"
      type="text"
      caption="password"
      :err="user?.err?.['password']?._errors?.[0]"
    />
    <td>{{ user.email }}</td>
    <EditableCellText
      v-model.number="localUser.money"
      type="number"
      caption="money"
      :err="user?.err?.['money']?._errors?.[0]"
    />
    <td>{{ user.isOnline }}</td>
    <EditableCellButtons
      @edit="updateUserById({ id: user.id, user: localUser })"
      @delete="deleteUserById(user.id)"
    />
  </tr>
</template>
