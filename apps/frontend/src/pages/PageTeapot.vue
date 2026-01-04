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
      return this.temperature === 100 && this.ongoing === 'idle'
    },
    isBoiling() {
      return this.ongoing === 'boiling'
    },
  },
  watch: {
    ongoing(newVal) {
      return {
        idle: () => this.turnOff(),
        boiling: () => this.turnOn(),
      }[newVal]?.()
    },
  },
  async mounted() {
    const emitter = subscribe()
    emitter.on('update', serverState => {
      this.temperature = serverState.temperature
      this.ongoing = serverState.ongoing
    })
    await sendShow()
  },
  methods: {
    async ready() {
      this.ongoing = 'idle'
      await sendShow()
    },
    turnOn() {
      clearInterval(this.intervalId)
      this.intervalId = setInterval(this.boil.bind(this), 100)
    },
    turnOff() {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    },
    async handleTurnOn() {
      this.ongoing = 'boiling'
      // this.loading = 'handleTurnOn'
      await sendTurnOn()
      // this.loading = ''
    },
    async handleTurnOff() {
      this.ongoing = 'idle'
      // this.loading = 'handleTurnOff'
      await sendTurnOff()
      // this.loading = ''
    },
    async handleDrain() {
      this.ongoing = 'idle'
      this.temperature = 0
      // this.loading = 'handleDrain'
      await sendDrain()
      // this.loading = ''
    },
    boil() {
      this.temperature = range(this.temperature + 1)
      if (this.temperature === 100 && this.ongoing === 'boiling') this.ready()
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
              <!-- :loading="loading === 'handleDrain'"
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
