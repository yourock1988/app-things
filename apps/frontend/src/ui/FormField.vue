<script>
import { VTextField, VCheckbox, VSelect } from 'vuetify/components'

export default {
  components: { VTextField, VCheckbox, VSelect },
  inheritAttrs: false,
  props: ['modelValue', 'field', 'comp', 'cols', 'err'],
  emits: ['update:model-value'],
  computed: {
    items() {
      return this.comp?.list
    },
    component() {
      const defaultComponent = 'VTextField'
      if (this.comp === null) return defaultComponent
      if (typeof this.comp === 'string') return this.comp
      if (typeof this.comp?.component !== 'string') return defaultComponent
      return this.comp?.component
    },
    type() {
      return this.comp?.type
    },
    modelModifiers() {
      return this.comp?.modify === 'number' ? { number: true } : undefined
    },
  },
}
</script>

<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <v-col :cols>
    <component
      :is="component"
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
  </v-col>
</template>
