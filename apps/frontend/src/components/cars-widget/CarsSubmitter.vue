<script>
import { mapActions } from 'vuex'
import FormGroup from '../FormGroup.vue'

export default {
  components: { FormGroup },

  data() {
    return {
      localCar: this.initCar(),
    }
  },

  methods: {
    ...mapActions('cars', ['createCar']),

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
      this.createCar({ ...this.localCar })
      this.localCar = this.initCar()
    },
  },
}
</script>

<template>
  <div class="card car-add-form-container">
    <h2>Добавить автомобиль</h2>
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
        <span class="icon">➕</span> Добавить
      </button>
    </form>
  </div>
</template>
