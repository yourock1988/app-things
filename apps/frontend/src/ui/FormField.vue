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
    'l',
    'cols',
  ],
  emits: ['update:model-value'],
}
</script>

<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <v-col :cols>
    <component
      :is="comp ?? 'VTextField'"
      :type
      :items="l"
      :label="field"
      :error-messages="err?.[field]?._errors"
      autocomplete="off"
      :modelModifiers
      :model-value="modelValue[field]"
      @update:model-value="
        $emit('update:model-value', { ...modelValue, [field]: $event })
      "
    />
  </v-col>
</template>
