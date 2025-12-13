<script>
export default {
  inheritAttrs: false,
  props: ['modelValue', 'err', 'field', 'isEditing', 'modelModifiers'],
  emits: ['update:model-value'],
}
</script>

<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <td>
    <v-text-field
      v-if="isEditing"
      autocomplete="off"
      density="compact"
      :modelModifiers
      :error-messages="err?.[field]?._errors"
      :model-value="modelValue[field]"
      @update:model-value="
        $emit('update:model-value', { ...modelValue, [field]: $event })
      "
    />
    <span v-else>{{ modelValue[field] }}</span>
  </td>
</template>
