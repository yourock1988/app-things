<script>
import state from '@/functions/state'

export default {
  components: {},

  computed: {
    searchQuery: state('products', 'searchQuery', 'setSearchQuery', true),
  },
}
</script>

<template>
  <h1>Main Page</h1>
</template>
