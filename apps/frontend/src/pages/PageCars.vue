<script>
import { mapActions, mapMutations } from 'vuex'
import CarsWidget from '@/components/cars-widget/CarsWidget.vue'

export default {
  components: { CarsWidget },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.SUBSCRIBE()
      vm.readCars()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.UNSUBSCRIBE()
    this.SET_CARS([])
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
    <CarsWidget />
  </div>
</template>
