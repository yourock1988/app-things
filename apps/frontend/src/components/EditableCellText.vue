<script>
export default {
  props: ['modelValue', 'err', 'type'],

  emits: ['update:model-value'],

  data() {
    return {
      style: {
        good: 'border: 1px solid gray',
        bad: 'border: 2px solid red',
      },
    }
  },
}
</script>

<template>
  <td :style="err ? style.bad : style.good" :title="err">
    <input
      style="width: 100px"
      :type
      :value="modelValue"
      @input="$emit('update:model-value', $event.target.value)"
    />
    <div v-if="err">{{ err }}</div>
  </td>
</template>

<style scoped>
td {
  position: relative;
}
div {
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 14px;
  color: red;
  background: #2345;
}
</style>
