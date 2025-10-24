<script>
import UsersItem from './UsersItem.vue'

import { patchUserById } from '../../api/users'

export default {
  components: { UsersItem },

  props: ['modelValue'],

  emits: ['update:model-value'],

  methods: {
    async handleEdit(editedUser) {
      const { id, ...body } = editedUser
      const updatedUser = await patchUserById(id, body)
      this.$emit(
        'update:model-value',
        this.modelValue.map(u => (u.id === updatedUser.id ? updatedUser : u))
      )
    },

    handleDelete(userId) {
      this.$emit(
        'update:model-value',
        this.modelValue.filter(u => u.id !== userId)
      )
    },
  },
}
</script>

<template>
  <tbody>
    <UsersItem
      v-for="user of modelValue"
      :key="user.id"
      :data-id="user.id"
      :user
      @user-edited="handleEdit"
      @user-deleted-id="handleDelete"
    />
  </tbody>
</template>
