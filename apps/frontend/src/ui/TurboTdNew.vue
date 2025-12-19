<script>
import { VTextField, VCheckbox, VSelect } from 'vuetify/components'

export default {
  components: { VTextField, VCheckbox, VSelect },
  inheritAttrs: false,
  props: ['modelValue', 'field', 'comp', 'err', 'isEditing'],
  emits: ['update:model-value'],
  computed: {
    rdyField() {
      return this.field.replaceAll('$', '')
    },
    isEditable() {
      return this.field.at(-1) === '$'
    },
    component() {
      const defaultComponent = 'VTextField'
      if (this.comp === null) return defaultComponent
      if (typeof this.comp === 'string') return this.comp
      if (typeof this.comp?.component !== 'string') return defaultComponent
      return this.comp?.component
    },
    modelModifiers() {
      return this.comp?.type === 'number' ? { number: true } : undefined
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
  <td>
    <component
      :is="component"
      v-if="isEditable && isEditing"
      :type="comp?.list"
      :items="comp?.type"
      :error-messages="err?.[rdyField]?._errors"
      autocomplete="off"
      density="compact"
      :modelModifiers
      :model-value="modelValue[rdyField]"
      @update:model-value="
        $emit('update:model-value', { ...modelValue, [rdyField]: $event })
      "
    />
    <span v-else>{{ modelValue[rdyField] }}</span>
  </td>
</template>
