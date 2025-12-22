<script>
import { VTextField, VCheckbox, VSelect, VCol } from 'vuetify/components'

export default {
  components: { VTextField, VCheckbox, VSelect, VCol },
  inheritAttrs: false,
  props: ['modelValue', 'field', 'comp', 'err', 'cols', 'isEditing', 'isForm'],
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
      return this.comp?.type === 'number' ? { number: true } : undefined
    },
    rdyField() {
      return this.field.replaceAll('$', '')
    },
    isEditable() {
      return this.isForm || this.field.at(-1) === '$'
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
  <component :is="cols ? 'v-col' : 'td'" :cols>
    <component
      :is="component"
      v-if="isForm || (isEditable && isEditing)"
      :type="comp?.type"
      :items="comp?.list"
      :label="rdyField"
      :error-messages="err?.[rdyField]?._errors"
      autocomplete="off"
      :density="!isForm ? 'compact' : 'default'"
      :modelModifiers
      :model-value="modelValue[rdyField]"
      @update:model-value="
        $emit('update:model-value', { ...modelValue, [rdyField]: $event })
      "
    />
    <span v-else>{{ modelValue[rdyField] }}</span>
  </component>
</template>
