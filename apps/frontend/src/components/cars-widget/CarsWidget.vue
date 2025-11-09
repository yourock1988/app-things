<script>
import { mapState, mapActions } from 'vuex'

import CarsSubmitter from './CarsSubmitter.vue'
import CarsUpdater from './CarsUpdater.vue'
import CarsList from './CarsList.vue'

export default {
  components: { CarsSubmitter, CarsList, CarsUpdater },

  computed: {
    ...mapState('cars', ['cars', 'err']),

    carKeys() {
      return Object.keys(this.cars.at(0) ?? {}).map(u => u.toUpperCase())
    },
  },

  mounted() {
    console.log('mounted')
  },

  unmounted() {
    console.log('unmounted')
  },

  methods: {
    ...mapActions('cars', ['readCars', 'createCar']),
  },
}
</script>

<template>
  <div id="w">
    <CarsUpdater @refresh="readCars" />

    <CarsSubmitter @car-submitted="createCar" />

    <h3>{{ err }}</h3>

    <div class="card table-wrapper">
      <table id="car-table">
        <thead>
          <tr>
            <th v-for="carKey of carKeys" :key="carKey">{{ carKey }}</th>
            <th></th>
          </tr>
        </thead>

        <CarsList v-model="cars" />
      </table>
    </div>
  </div>
</template>
