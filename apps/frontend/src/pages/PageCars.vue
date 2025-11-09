<script>
import { mapActions, mapMutations } from 'vuex'
import CarsWidget from '@/components/cars-widget/CarsWidget.vue'

export default {
  components: { CarsWidget },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.readCars())
  },
  beforeRouteLeave(to, from, next) {
    this.RESET_CARS()
    next()
  },

  methods: {
    // eslint-disable-next-line vue/no-unused-properties
    ...mapActions('cars', ['readCars']),

    ...mapMutations('cars', ['RESET_CARS']),
  },
}
</script>

<template>
  <div>
    <h3>PAGE CARS</h3>
    <CarsWidget />
  </div>
</template>
