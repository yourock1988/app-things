<script>
export default {
  props: ['user'],
}
</script>

<template>
  <td data-label="isOnline" class="online-checkbox-cell">
    <input
      type="checkbox"
      class="online-status-checkbox"
      v-model="user.isOnline"
    />
  </td>
</template>
