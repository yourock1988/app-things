<script>
import UsersItem from './UsersItem.vue'

export default {
  components: { UsersItem },

  props: ['modelValue'],

  emits: ['update:model-value'],

  methods: {
    handleEdit(editedUser) {
      this.$emit(
        'update:model-value',
        this.modelValue.map(u => (u.id === editedUser.id ? editedUser : u))
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
