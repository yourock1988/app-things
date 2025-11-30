<script>
import { mapActions, mapState } from 'vuex'
import FormField from './FormField.vue'

export default {
  components: { FormField },

  data() {
    return {
      dto: this.initCar(),
      loading: false,
    }
  },

  computed: {
    ...mapState('cars', ['err']),
  },

  methods: {
    ...mapActions('cars', ['createCar']),

    initCar() {
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

    async handleSubmit() {
      this.loading = true
      await this.createCar({ ...this.dto })
      this.dto = this.initCar()
      this.loading = false
    },
  },
}
</script>

<template>
  <v-form validate-on="submit lazy" @submit.prevent="handleSubmit">
    <v-row class="justify-center">
      <v-col cols="3">
        <FormField v-model="dto" :err field="type" />
      </v-col>
      <v-col cols="3">
        <FormField v-model="dto" :err field="brand" />
      </v-col>
      <v-col cols="3">
        <FormField v-model="dto" :err field="model" />
      </v-col>
      <v-col cols="3">
        <FormField v-model.number="dto" :err field="price" />
      </v-col>
      <v-col cols="3">
        <FormField v-model="dto" :err field="engine" />
      </v-col>
      <v-col cols="3">
        <FormField v-model.number="dto" :err field="hp" />
      </v-col>
      <v-col cols="3">
        <FormField
          v-model.number="dto"
          :err
          field="hasTurbo"
          comp="v-checkbox"
        />
      </v-col>

      <v-col cols="3">
        <v-btn :loading type="submit">Submit</v-btn>
      </v-col>
      <v-col v-if="err?._errors.length > 0" cols="12">
        <p>{{ err?._errors }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>
