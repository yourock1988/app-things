<script>
import { mapActions } from 'vuex'
import TurboTd from './TurboTd.vue'
import TurboBtn from './TurboBtn.vue'

export default {
  components: { TurboTd, TurboBtn },

  props: ['car'],

  data() {
    return {
      localCar: this.parseCar(this.car),
      isEditing: false,
    }
  },

  computed: {
    err() {
      return this.car.err ?? null
    },
  },

  watch: {
    car: {
      deep: true,
      handler(val) {
        if (val.err || this.isEditing) return
        this.localCar = this.parseCar(val)
      },
    },
  },

  methods: {
    ...mapActions('cars', ['updateCarById', 'deleteCarById']),

    parseCar(car) {
      const { price, engine, hasTurbo, hp } = car
      return { price, engine, hasTurbo, hp }
    },
    async save() {
      this.isEditing = false
      await this.updateCarById({
        id: this.car.id,
        car: { ...this.localCar },
      })
      if (this.car.err) {
        this.isEditing = true
      }
    },
    cancel() {
      this.localCar = this.parseCar(this.car)
      this.isEditing = false
    },
  },
}
</script>

<template>
  <tr>
    <TurboTd :model-value="car" field="id" />
    <TurboTd :model-value="car" field="type" />
    <TurboTd :model-value="car" field="brand" />
    <TurboTd :model-value="car" field="model" />
    <TurboTd v-model.number="localCar" field="price" :err :is-editing />
    <TurboTd v-model="localCar" field="engine" :err :is-editing />
    <TurboTd :model-value="car" field="hasTurbo" />
    <TurboTd v-model.number="localCar" field="hp" :err :is-editing />
    <TurboTd :model-value="car" field="isRunning" />
    <td class="d-flex align-center justify-space-around">
      <template v-if="isEditing">
        <TurboBtn kind="cancel" @click="cancel" />
        <TurboBtn kind="save" @click="save" />
      </template>
      <template v-else>
        <TurboBtn kind="edit" @click="isEditing = true" />
        <TurboBtn kind="delete" @click="deleteCarById(car.id)" />
      </template>
    </td>
  </tr>
</template>
