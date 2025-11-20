<script>
import UsersSubmitter from './UsersSubmitter.vue'
import UsersList from './UsersList.vue'

export default {
  components: { UsersSubmitter, UsersList },
}
</script>

<template>
  <div>
    <UsersSubmitter />
    <UsersList />
  </div>
</template>
