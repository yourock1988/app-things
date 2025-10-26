<script>
import UsersItem from './UsersItem.vue'

import { patchUserById, deleteUserById } from '../../api/users'

export default {
  components: { UsersItem },

  props: ['modelValue'],

  emits: ['update:model-value'],

  methods: {
    async handleEdit(userId, editedUser) {
      const updatedUser = await patchUserById(userId, editedUser)
      if (!updatedUser) {
        // TODO: не странное ли поведение ?
        await this.handleDelete(userId)
        return
      }
      this.$emit(
        'update:model-value',
        this.modelValue.map(u => (u.id === updatedUser.id ? updatedUser : u))
      )
    },

    async handleDelete(userId) {
      await deleteUserById(userId)
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
