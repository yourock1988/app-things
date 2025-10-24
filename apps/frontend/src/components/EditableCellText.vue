<script>
export default {
  props: ['modelValue', 'caption'],

  emits: ['update:model-value'],
}
</script>

<template>
  <td
    contenteditable="true"
    :data-label="caption"
    @input="$emit('update:model-value', $event.target.textContent)"
  >
    {{ modelValue }}
  </td>
</template>
