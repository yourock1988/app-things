<script>
import { mapState, mapActions } from 'vuex'

import CarsSubmitter from './CarsSubmitter.vue'
import CarsList from './CarsList.vue'

export default {
  components: { CarsSubmitter, CarsList },

  computed: {
    ...mapState('cars', ['cars', 'err']),

    carKeys() {
      return Object.keys(this.cars.at(0) ?? {}).map(u => u.toUpperCase())
    },
  },

  methods: {
    ...mapActions('cars', ['createCar']),
  },
}
</script>

<template>
  <div id="w">
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
