<script>
import { VTextField, VCheckbox, VSelect } from 'vuetify/components'

export default {
  components: { VTextField, VCheckbox, VSelect },
  inheritAttrs: false,
  props: ['modelValue', 'field', 'comp', 'err', 'cols'],
  emits: ['update:model-value'],
  computed: {
    component() {
      const defaultComponent = 'VTextField'
      if (this.comp === null) return defaultComponent
      if (typeof this.comp === 'string') return this.comp
      if (typeof this.comp?.component !== 'string') return defaultComponent
      return this.comp?.component
    },
    modelModifiers() {
      return this.comp?.modify === 'number' ? { number: true } : undefined
    },
    rdyField() {
      return this.field.replaceAll('$', '')
    },
  },
  watch: {
    // выключенная галочка должна быть false вместо undefined
    modelValue: {
      immediate: true,
      handler() {
        if (
          this.component === 'v-checkbox' &&
          this.modelValue[this.rdyField] === undefined
        ) {
          this.$emit('update:model-value', {
            ...this.modelValue,
            [this.rdyField]: false,
          })
        }
      },
    },
  },
}
</script>

<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <v-col :cols>
    <component
      :is="component"
      :type="comp?.type"
      :items="comp?.list"
      :label="rdyField"
      :error-messages="err?.[rdyField]?._errors"
      autocomplete="off"
      :modelModifiers
      :model-value="modelValue[rdyField]"
      @update:model-value="
        $emit('update:model-value', { ...modelValue, [rdyField]: $event })
      "
    />
  </v-col>
</template>
