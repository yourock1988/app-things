<script>
import { mapActions } from 'vuex'

export default {
  props: ['car'],

  data() {
    return {
      localCar: this.parseCar(this.car),
      isEdit: false,
    }
  },

  watch: {
    car: {
      deep: true,
      handler(val) {
        if (val.err || this.isEdit) return
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
    async save() {
      this.isEdit = false
      await this.updateCarById({
        id: this.car.id,
        car: { ...this.localCar },
      })
      if (this.car.err) {
        this.isEdit = true
      }
    },
    cancel() {
      this.localCar = this.parseCar(this.car)
      this.isEdit = false
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
    <td>
      <v-text-field
        v-if="isEdit"
        v-model.number="localCar.price"
        :error-messages="car.err?.price?._errors"
        density="compact"
      />
      <span v-else>{{ localCar.price }}</span>
    </td>
    <td>
      <v-text-field
        v-if="isEdit"
        v-model="localCar.engine"
        :error-messages="car.err?.engine?._errors"
        density="compact"
      />
      <span v-else>{{ localCar.engine }}</span>
    </td>
    <td>
      <v-checkbox
        v-if="isEdit"
        v-model="localCar.hasTurbo"
        :error-messages="car.err?.hasTurbo?._errors"
        density="compact"
      />
      <span v-else>{{ localCar.hasTurbo }}</span>
    </td>
    <td>
      <v-text-field
        v-if="isEdit"
        v-model.number="localCar.hp"
        :error-messages="car.err?.hp?._errors"
        density="compact"
      />
      <span v-else>{{ localCar.hp }}</span>
    </td>
    <td>{{ car.isRunning }}</td>
    <td class="d-flex align-center justify-space-around">
      <template v-if="isEdit">
        <v-btn
          size="small"
          color="warning"
          prepend-icon="mdi-cancel"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          size="small"
          color="secondary"
          prepend-icon="mdi-content-save-edit"
          @click="save"
        >
          Save
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          size="small"
          color="primary"
          prepend-icon="mdi-pencil"
          @click="isEdit = true"
        >
          Edit
        </v-btn>
        <v-btn
          size="small"
          color="error"
          prepend-icon="mdi-delete-forever"
          @click="deleteCarById(car.id)"
        >
          Delete
        </v-btn>
      </template>
    </td>
  </tr>
</template>
