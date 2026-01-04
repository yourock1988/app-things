<script>
import {
  sendShow,
  sendTurnOn,
  sendTurnOff,
  sendDrain,
  subscribe,
} from '@/api/ws/teapot.js'

const makeRange = (min, max) => val => Math.max(min, Math.min(val, max))
const range = makeRange(0, 100)

export default {
  data() {
    return {
      temperature: 0,
      ongoing: 'idle',
      intervalId: undefined,
      // loading: '',
    }
  },
  computed: {
    isBoiled() {
      return this.temperature === 100
    },
    isBoiling() {
      return !!this.intervalId && !this.isBoiled
    },
  },
  async mounted() {
    subscribe(this)
    await sendShow()
  },
  methods: {
    async ready() {
      this.turnOff()
      await sendShow()
    },
    turnOn() {
      this.ongoing = 'boiling'
      clearInterval(this.intervalId)
      this.intervalId = setInterval(this.boil.bind(this), 100)
    },
    turnOff() {
      this.ongoing = 'idle'
      clearInterval(this.intervalId)
      this.intervalId = undefined
    },
    async handleTurnOn() {
      this.turnOn()
      // this.loading = 'handleTurnOn'
      await sendTurnOn()
      // this.loading = ''
    },
    async handleTurnOff() {
      this.turnOff()
      // this.loading = 'handleTurnOff'
      await sendTurnOff()
      // this.loading = ''
    },
    async handleDrain() {
      this.turnOff()
      this.temperature = 0
      // this.loading = 'handleTurnDrain'
      await sendDrain()
      // this.loading = ''
    },
    boil() {
      this.temperature = range(this.temperature + 1)
      if (this.temperature === 100) this.ready()
    },
  },
}
</script>

<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-sheet>
        <v-container class="text-center">
          <h1 class="mb-3">Teapot</h1>
          <v-row>
            <v-col cols="12">
              <v-progress-linear
                :model-value="temperature"
                color="indigo"
                height="23"
                striped
              >
                <strong>{{ Math.ceil(temperature) }}°C</strong>
              </v-progress-linear>
            </v-col>
            <v-col cols="4">
              <!-- :loading="loading === 'handleTurnOn'"
              :disabled="isBoiling || isBoiled" -->
              <v-btn color="secondary" @click="handleTurnOn">turnOn</v-btn>
            </v-col>
            <v-col cols="4">
              <!-- :loading="loading === 'handleTurnOff'"
              :disabled="!isBoiling" -->
              <v-btn color="warning" @click="handleTurnOff">turnOff</v-btn>
            </v-col>
            <v-col cols="4">
              <!-- :loading="loading === 'handleTurnDrain'"
              :disabled="temperature === 0" -->
              <v-btn color="error" @click="handleDrain">turnDrain</v-btn>
            </v-col>
            <v-col v-if="isBoiling" cols="12">
              <h2>boiling...</h2>
            </v-col>
            <v-col v-if="isBoiled" cols="12">
              <h1>READY!</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style>
main > div {
  user-select: none;
}
</style>
