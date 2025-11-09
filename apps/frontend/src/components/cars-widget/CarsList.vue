<script>
import CarsItem from './CarsItem.vue'

// import { patchCarById, deleteCarById } from '../../api/cars'

export default {
  components: { CarsItem },

  props: ['modelValue'],

  emits: ['update:model-value'],

  // methods: {
  //   async handleEdit(carId, editedCar) {
  //     const updatedCar = await patchCarById(carId, editedCar)
  //     if (!updatedCar) {
  //       // TODO: не странное ли поведение ?
  //       await this.handleDelete(carId)
  //       return
  //     }
  //     this.$emit(
  //       'update:model-value',
  //       this.modelValue.map(u => (u.id === updatedCar.id ? updatedCar : u))
  //     )
  //   },

  //   async handleDelete(carId) {
  //     await deleteCarById(carId)
  //     this.$emit(
  //       'update:model-value',
  //       this.modelValue.filter(u => u.id !== carId)
  //     )
  //   },
  // },
}
</script>

<template>
  <tbody>
    <CarsItem v-for="car of modelValue" :key="car.id" :data-id="car.id" :car />
  </tbody>
</template>
