<script>
import { mapActions } from 'vuex'

export default {
  props: ['user'],

  data() {
    return {
      localUser: this.parseUser(this.user),
      isEdit: false,
    }
  },

  watch: {
    user: {
      deep: true,
      handler(val) {
        if (val.err || this.isEdit) return
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
      this.isEdit = false
      await this.updateUserById({
        id: this.user.id,
        user: { ...this.localUser },
      })
      if (this.user.err) {
        this.isEdit = true
      }
    },
    cancel() {
      this.localUser = this.parseUser(this.user)
      this.isEdit = false
    },
  },
}
</script>

<template>
  <tr>
    <td>{{ user.id }}</td>
    <td>{{ user.nickname }}</td>
    <td>
      <v-text-field
        v-if="isEdit"
        v-model="localUser.password"
        :error-messages="user.err?.password?._errors"
        density="compact"
      />
      <span v-else>{{ localUser.password }}</span>
    </td>
    <td>{{ user.email }}</td>
    <td>
      <v-text-field
        v-if="isEdit"
        v-model.number="localUser.money"
        :error-messages="user.err?.money?._errors"
        density="compact"
      />
      <span v-else>{{ localUser.money }}</span>
    </td>
    <td>{{ user.isOnline }}</td>
    <td class="d-flex align-center justify-space-around">
      <template v-if="isEdit">
        <v-btn
          size="small"
          color="warning"
          prepend-icon="mdi-cancel"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          size="small"
          color="secondary"
          prepend-icon="mdi-content-save-edit"
          @click="save"
        >
          Save
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          size="small"
          color="primary"
          prepend-icon="mdi-pencil"
          @click="isEdit = true"
        >
          Edit
        </v-btn>
        <v-btn
          size="small"
          color="error"
          prepend-icon="mdi-delete-forever"
          @click="deleteUserById(user.id)"
        >
          Delete
        </v-btn>
      </template>
    </td>
  </tr>
</template>
