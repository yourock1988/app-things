<script>
export default {
  props: ['modelValue', 'caption'],

  emits: ['update:model-value'],
}
</script>

<template>
  <td
    @input="$emit('update:model-value', $event.target.textContent)"
    :data-label="caption"
    contenteditable="true"
  >
    {{ modelValue }}
  </td>
</template>
