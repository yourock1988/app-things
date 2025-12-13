<script>
import { mapState } from 'vuex'
import CarsItem from './CarsItem.vue'
import TableSheet from '../../ui/TableSheet.vue'

export default {
  components: { CarsItem, TableSheet },

  computed: {
    ...mapState('cars', ['cars']),
  },
}
</script>

<template>
  <TableSheet :struct="cars[0]">
    <CarsItem v-for="car of cars" :key="car.id" :car />
  </TableSheet>
</template>
