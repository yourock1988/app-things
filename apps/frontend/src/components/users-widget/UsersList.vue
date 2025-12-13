<script>
import { mapState } from 'vuex'
import UsersItem from './UsersItem.vue'
import TableSheet from '../TableSheet.vue'

export default {
  components: { UsersItem, TableSheet },

  computed: {
    ...mapState('users', ['users']),
  },
}
</script>

<template>
  <TableSheet :struct="users[0]">
    <UsersItem v-for="user of users" :key="user.id" :user />
  </TableSheet>
</template>
