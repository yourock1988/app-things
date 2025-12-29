<script>
import {
  sendShow,
  sendTurnOn,
  sendTurnOff,
  sendDrain,
  subscribe,
} from '@/api/ws/teapot.js'

export default {
  data() {
    return {
      min: 0,
      max: 100,
      temperature: 0,
      intervalId: undefined,
      needSync: '',
      loading: '',
    }
  },
  computed: {
    isBoiled() {
      return this.temperature === 100
    },
    isBoiling() {
      return !!this.intervalId
    },
  },
  watch: {
    temperature(val) {
      if (val === 100) this.ready()
    },
  },
  async mounted() {
    const [err, data] = await sendShow()
    if (err) return
    if (data.ongoing === 'boiling') this.turnOn()
    this.temperature = data.temperature
    const { turnOn, turnOff, turnDrain } = this
    subscribe({ turnOn, turnOff, turnDrain })
  },
  methods: {
    async ready() {
      this.turnOff()
      const [err, data] = await sendShow()
      if (!err) this.temperature = data.temperature
    },
    boil() {
      this.temperature = Math.max(
        this.min,
        Math.min(this.temperature + 1, this.max),
      )
    },
    turnOn(teapotDto) {
      clearInterval(this.intervalId)
      this.intervalId = setInterval(this.boil.bind(this), 100)
      if (teapotDto) this.temperature = teapotDto.temperature
    },
    turnOff(teapotDto) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
      if (teapotDto) this.temperature = teapotDto.temperature
    },
    turnDrain(teapotDto) {
      this.turnOff()
      this.temperature = 0
      if (teapotDto) this.temperature = teapotDto.temperature
    },
    async handleTurnOn() {
      this.turnOn()
      this.needSync = 'handleTurnOn'
      this.loading = 'handleTurnOn'
      const [err, data] = await sendTurnOn()
      this.loading = ''
      if (err) return
      if (
        this.needSync === 'handleTurnOn' &&
        data.ongoing === 'boiling' &&
        !this.isBoiling
      ) {
        this.turnOn()
        this.needSync = ''
      }
    },
    async handleTurnOff() {
      this.turnOff()
      this.needSync = 'handleTurnOff'
      this.loading = 'handleTurnOff'
      const [err, data] = await sendTurnOff()
      this.loading = ''
      if (err) return
      this.temperature = data.temperature
      if (
        this.needSync === 'handleTurnOff' &&
        data.ongoing === 'idle' &&
        this.isBoiling
      ) {
        this.turnOff()
        this.needSync = ''
      }
    },
    async handleTurnDrain() {
      this.turnDrain()
      this.needSync = 'handleTurnDrain'
      this.loading = 'handleTurnDrain'
      const [err, data] = await sendDrain()
      this.loading = ''
      if (err) return
      if (
        this.needSync === 'handleTurnDrain' &&
        data.ongoing === 'idle' &&
        data.temperature === 0 &&
        this.isBoiling
      ) {
        this.turnDrain()
        this.needSync = ''
      }
      /**
       * пока на сервер осылалось сообщение о клиентском дрейне,
       * от сервера пришел клиентский бродкаст про старт,
       * а затем от сервера пришел ack что состояние дрейн успешно установлено
       * БУУУМ ВЫНОС МОЗГА
       *
       * needSync указывает на последнее действие пользователя,
       * которое требует доп синхронизации через ответный ack от сервера
       */
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
              <v-btn
                :loading="loading === 'handleTurnOn'"
                :disabled="isBoiling || isBoiled"
                color="secondary"
                @click="handleTurnOn"
                >turnOn</v-btn
              >
            </v-col>
            <v-col cols="4">
              <v-btn
                :loading="loading === 'handleTurnOff'"
                :disabled="!isBoiling"
                color="warning"
                @click="handleTurnOff"
                >turnOff</v-btn
              >
            </v-col>
            <v-col cols="4">
              <v-btn
                :loading="loading === 'handleTurnDrain'"
                :disabled="temperature === 0"
                color="error"
                @click="handleTurnDrain"
                >turnDrain</v-btn
              >
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
