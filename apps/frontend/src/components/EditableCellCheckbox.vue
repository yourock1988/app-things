<script>
export default {
  props: ['modelValue', 'err'],

  emits: ['update:model-value'],
}
</script>

<template>
  <td class="checkbox-cell">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:model-value', $event.target.checked)"
    />
    <div v-if="err">{{ err }}</div>
  </td>
</template>

<style scoped>
td {
  position: relative;
}
div {
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 14px;
  color: red;
  background: #2345;
}
</style>
