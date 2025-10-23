<script>
import UsersItem from './UsersItem.vue'

export default {
  components: { UsersItem },

  props: ['users'],

  emits: ['users-updated'],

  methods: {
    handleEdit(editedUser) {
      this.$emit(
        'users-updated',
        this.users.map(u => (u.id === editedUser.id ? editedUser : u))
      )
    },
  },
}
</script>

<template>
  <tbody>
    <UsersItem
      v-for="user of users"
      :key="user.id"
      :data-id="user.id"
      :user
      @user-edited="handleEdit"
    />
  </tbody>
</template>
