<script>
import CarsItem from './CarsItem.vue'

export default {
  components: { CarsItem },

  props: ['modelValue'],

  emits: ['update:model-value'],
}
</script>

<template>
  <tbody>
    <CarsItem v-for="car of modelValue" :key="car.id" :car />
  </tbody>
</template>
