<script>
import UsersItem from './UsersItem.vue'

export default {
  components: { UsersItem },

  props: ['modelValue'],

  emits: ['update:model-value'],
}
</script>

<template>
  <tbody>
    <UsersItem v-for="user of modelValue" :key="user.id" :user />
  </tbody>
</template>
