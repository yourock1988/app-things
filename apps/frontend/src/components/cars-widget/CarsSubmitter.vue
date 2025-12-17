<script>
import { mapActions, mapState } from 'vuex'
import FormSheet from '../../ui/FormSheet.vue'
import CarsForm from '../CarsForm.vue'

export default {
  components: { CarsForm, FormSheet },

  data() {
    return {
      sizing: { cols: 12 },
      cols: 3,
      fields: {
        type: null,
        brand: null,
        model: null,
        price: { type: 'number', modify: 'number' },
        engine: null,
        hp: { type: 'number', modify: 'number' },
        hasTurbo: 'v-checkbox',
      },
    }
  },
  computed: {
    ...mapState('cars', ['err']),
  },
  methods: {
    ...mapActions('cars', ['createCar']),
    async submit({ resolve, ...dto }) {
      await this.createCar(dto)
      resolve()
    },
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
  <FormSheet caption="Create car" :sizing>
    <CarsForm :fields :err :cols :init-test @submit="submit" />
  </FormSheet>
</template>
