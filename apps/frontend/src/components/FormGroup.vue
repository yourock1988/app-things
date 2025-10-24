<script>
export default {
  props: ['modelValue', 'placeholder', 'type'],

  emits: ['update:model-value'],
}
</script>

<template>
  <div class="form-group">
    <label>
      <span>{{ placeholder }}: </span>
      <input
        :value="modelValue"
        :placeholder
        :required="!type"
        :type="type || 'text'"
        @input="$emit('update:model-value', $event.target.value)"
      />
    </label>
  </div>
</template>
