<script>
import FormGroup from '../FormGroup.vue'

export default {
  components: { FormGroup },

  emits: ['car-submitted'],

  data() {
    return {
      localCar: this.initCar(),
    }
  },

  methods: {
    initCar() {
      return {
        type: 'Muscle',
        brand: 'Bugatti',
        model: 'Veyron',
        price: 111111,
        engine: 'W16',
        hasTurbo: true,
        hp: 999,
      }
    },

    handleSubmit() {
      this.$emit('car-submitted', { ...this.localCar })
      this.localCar = this.initCar()
    },
  },
}
</script>

<template>
  <div class="card car-add-form-container">
    <h2>Новый автомобиль</h2>
    <form id="elFormAddCar" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormGroup v-model="localCar.type" placeholder="type" />
        <FormGroup v-model="localCar.brand" placeholder="brand" />
        <FormGroup v-model="localCar.model" placeholder="model" />
        <FormGroup v-model.number="localCar.price" placeholder="price" />
        <FormGroup v-model="localCar.engine" placeholder="engine" />
        <FormGroup v-model="localCar.hasTurbo" placeholder="hasTurbo" />
        <FormGroup v-model.number="localCar.hp" placeholder="hp" />
      </div>
      <button type="submit" class="control-btn primary">
        <span class="icon">➕</span> Добавить автомобиль
      </button>
    </form>
  </div>
</template>
