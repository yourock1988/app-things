<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      localCar: this.initCar(),
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
      await this.createCar({ ...this.localCar })
      this.localCar = this.initCar()
      this.loading = false
    },
  },
}
</script>

<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-sheet class="elevation-5 overflow-hidden" border="thin" rounded="xl">
          <h6 class="text-h6 text-center">Create car</h6>
          <v-form validate-on="submit lazy" @submit.prevent="handleSubmit">
            <v-container>
              <v-row class="justify-center">
                <v-col cols="3">
                  <v-text-field
                    v-model="localCar.type"
                    :error-messages="err?.type?._errors"
                    label="type"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="localCar.brand"
                    :error-messages="err?.brand?._errors"
                    label="brand"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="localCar.model"
                    :error-messages="err?.model?._errors"
                    label="model"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model.number="localCar.price"
                    :error-messages="err?.price?._errors"
                    label="price"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="localCar.engine"
                    :error-messages="err?.engine?._errors"
                    label="engine"
                    autocomplete="off"
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model.number="localCar.hp"
                    :error-messages="err?.hp?._errors"
                    label="hp"
                    autocomplete="off"
                  />
                </v-col>

                <v-col cols="3">
                  <v-checkbox
                    v-model="localCar.hasTurbo"
                    :error-messages="err?.hasTurbo?._errors"
                    label="hasTurbo"
                    autocomplete="off"
                  />
                </v-col>

                <v-col cols="3">
                  <v-btn
                    :loading
                    size="x-large"
                    type="submit"
                    text="Submit"
                    block
                  ></v-btn>
                </v-col>

                <v-col v-if="err?._errors.length > 0" cols="12">
                  <p>{{ err?._errors }}</p>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
