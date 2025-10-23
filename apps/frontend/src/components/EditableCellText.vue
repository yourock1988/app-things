<script>
export default {
  props: ['user'],
}
</script>

<template>
  <td
    @input="user.nickname = $event.target.textContent"
    data-label="nickname"
    contenteditable="true"
  >
    {{ user.nickname }}
  </td>
</template>
