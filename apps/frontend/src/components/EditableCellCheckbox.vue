<script>
export default {
  props: ['modelValue', 'caption'],

  emits: ['update:model-value'],
}
</script>

<template>
  <td :data-label="caption" class="online-checkbox-cell">
    <input
      type="checkbox"
      class="online-status-checkbox"
      :checked="modelValue"
      @change="$emit('update:model-value', $event.target.checked)"
    />
  </td>
</template>
