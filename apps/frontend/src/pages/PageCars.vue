<script>
import { mapActions, mapMutations } from 'vuex'
import CarsSubmitter from '@/components/cars-widget/CarsSubmitter.vue'
import CarsList from '@/components/cars-widget/CarsList.vue'

export default {
  components: { CarsSubmitter, CarsList },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.readCars()
      vm.SUBSCRIBE()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.SET_CARS([])
    this.UNSUBSCRIBE()
    next()
  },

  methods: {
    // eslint-disable-next-line vue/no-unused-properties
    ...mapActions('cars', ['readCars']),

    // eslint-disable-next-line vue/no-unused-properties
    ...mapMutations('cars', ['SET_CARS', 'UNSUBSCRIBE', 'SUBSCRIBE']),
  },
}
</script>

<template>
  <div>
    <h3>PAGE CARS</h3>
    <div>
      <CarsSubmitter />
      <CarsList />
    </div>
  </div>
</template>
