<script>
import { VBtn, VCheckbox, VSelect, VTextField } from 'vuetify/components'

export default {
  components: { VBtn, VTextField, VSelect, VCheckbox },
  inheritAttrs: false,
  props: [
    'modelValue',
    'err',
    'field',
    'type',
    'modelModifiers',
    'comp',
    'items',
  ],
  emits: ['update:model-value'],
}
</script>

<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <component
    :is="comp ?? 'VTextField'"
    :type
    :items
    :label="field"
    :error-messages="err?.[field]?._errors"
    autocomplete="off"
    :modelModifiers
    :model-value="modelValue[field]"
    @update:model-value="
      $emit('update:model-value', { ...modelValue, [field]: $event })
    "
  />
</template>
