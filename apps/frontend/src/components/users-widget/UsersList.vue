<script>
import UsersItem from './UsersItem.vue'

export default {
  components: { UsersItem },

  props: ['users'],
}
</script>

<template>
  <tbody id="elTBodyUsers">
    <UsersItem v-for="user of users" :key="user.id" :data-id="user.id" :user />
  </tbody>
</template>
