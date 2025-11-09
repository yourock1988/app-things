<script>
import { mapActions } from 'vuex'
import EditableCellButtons from '../EditableCellButtons.vue'
import EditableCellText from '../EditableCellText.vue'
import EditableCellCheckbox from '../EditableCellCheckbox.vue'

export default {
  components: { EditableCellText, EditableCellButtons, EditableCellCheckbox },

  props: ['car'],

  data() {
    return {
      localCar: this.parseCar(this.car),
    }
  },

  watch: {
    car: {
      deep: true,
      handler(val) {
        this.localCar = this.parseCar(val)
      },
    },
  },

  methods: {
    ...mapActions('cars', ['updateCarById', 'deleteCarById']),

    parseCar(car) {
      const { price, engine, hasTurbo, hp } = car
      return { price, engine, hasTurbo, hp }
    },
  },
}
</script>

<template>
  <tr>
    <td>{{ car.id }}</td>
    <td>{{ car.type }}</td>
    <td>{{ car.brand }}</td>
    <td>{{ car.model }}</td>
    <EditableCellText
      v-model.number="localCar.price"
      type="number"
      caption="price"
      :err="car?.err?.['price']?._errors?.[0]"
    />
    <EditableCellText
      v-model="localCar.engine"
      type="text"
      caption="engine"
      :err="car?.err?.['engine']?._errors?.[0]"
    />
    <EditableCellCheckbox
      v-model="localCar.hasTurbo"
      caption="hasTurbo"
      :err="car?.err?.['hasTurbo']?._errors?.[0]"
    />
    <EditableCellText
      v-model.number="localCar.hp"
      type="number"
      caption="hp"
      :err="car?.err?.['hp']?._errors?.[0]"
    />
    <td>{{ car.isRunning }}</td>
    <EditableCellButtons
      @edit="updateCarById({ id: car.id, car: localCar })"
      @delete="deleteCarById(car.id)"
    />
  </tr>
</template>
