<script>
import { add, getAll, removeById, updateById } from '@/api/ws/cars.js'
import { mapMutations } from 'vuex'
import TurboFormNew from '@/ui/TurboFormNew.vue'
import TurboTable from '@/ui/TurboTable.vue'
import FormSheet from '@/ui/FormSheet.vue'

export default {
  components: { TurboTable, FormSheet, TurboFormNew },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.SUBSCRIBE()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.SET_CARS([])
    this.UNSUBSCRIBE()
    next()
  },
  data() {
    return {
      cols: 3,
      sizing: { cols: 12 },
      fields: {
        id: null,
        type: null,
        brand: null,
        model: null,
        price$: { type: 'number' },
        engine$: null,
        hasTurbo$: 'v-checkbox',
        hp$: { type: 'number' },
        isRunning: 'v-checkbox',
      },
      fieldsForm: {
        type: null,
        brand: null,
        model: null,
        price: { type: 'number' },
        engine: null,
        hp: { type: 'number' },
        hasTurbo: 'v-checkbox',
      },
    }
  },
  computed: {
    cars: {
      get() {
        return this.$store.state.cars.cars
      },
      set(val) {
        this.SET_CARS(val)
      },
    },
  },
  methods: {
    ...mapMutations('cars', [
      // eslint-disable-next-line vue/no-unused-properties
      'SUBSCRIBE',
      'UNSUBSCRIBE',
      'SET_CARS',
      'ADD_CAR',
    ]),
    add,
    getAll,
    removeById,
    updateById,
    initTest() {
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
  },
}
</script>

<template>
  <div>
    <h3>PAGE CARS</h3>
    <FormSheet caption="Create car" :sizing>
      <TurboFormNew
        :add
        :cols
        :fields="fieldsForm"
        :init-test
        @submitted="ADD_CAR($event)"
      />
    </FormSheet>
    <TurboTable v-model="cars" :fields :get-all :update-by-id :remove-by-id />
  </div>
</template>
