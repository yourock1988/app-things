<script>
import { mapState } from 'vuex'
import CarsItem from './CarsItem.vue'

export default {
  components: { CarsItem },

  computed: {
    ...mapState('cars', ['cars']),

    keysNames() {
      return Object.keys(this.cars.at(0) ?? {})
        .map(u => u.toUpperCase())
        .filter(u => u !== 'ERR')
    },
  },

  methods: {},
}
</script>

<template>
  <v-container>
    <v-sheet class="elevation-5 overflow-hidden" border="thin" rounded="xl">
      <v-table height="350px" striped="even" fixed-header>
        <thead>
          <tr>
            <th v-for="keyName of keysNames" :key="keyName">{{ keyName }}</th>
            <th class="text-center">ACTIONS</th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="collapse">
          <CarsItem v-for="car of cars" :key="car.id" :car />
        </transition-group>
      </v-table>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.collapse-leave-to {
  transform: translateY(-42px);
  opacity: 0;
}
.collapse-enter-active,
.collapse-leave-active {
  transition:
    opacity 0.15s ease-in,
    transform 0.15s ease-in;
}
</style>
