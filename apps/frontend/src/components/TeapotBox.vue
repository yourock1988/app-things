<script>
import { mapState } from 'vuex'
import TeapotSynchronizer from '@/api/io/teapotsApiIo.js'
import { getById } from '@/api/rest/accountsApiRest.js'
import TurboBtn from '@/ui/TurboBtn.vue'

const makeRange = (min, max) => val => Math.max(min, Math.min(val, max))
const range = makeRange(0, 100)

export default {
  components: { TurboBtn },

  props: ['teapotId'],

  data() {
    return {
      err: null,
      ownerNickname: '',
      ownerAccountId: -1,
      temperature: 0,
      ongoing: 'idle',
      isOnline: false,
      intervalId: undefined,
      // loading: '',
      teapotSynchronizer: null,
    }
  },
  computed: {
    ...mapState('authStore', ['session']),
    isOwner() {
      return this.session?.nickname === this.ownerNickname
    },
    isBoiled() {
      return this.temperature === 100 && this.ongoing === 'idle'
    },
    // isBoiling() {
    //   return this.ongoing === 'boiling'
    // },
  },
  watch: {
    async ownerAccountId(newVal) {
      const [err, data] = await getById(newVal)
      if (err) this.ownerNickname = ''
      else this.ownerNickname = data.nickname
    },
    ongoing(newVal) {
      return {
        idle: () => this.turnOff(),
        boiling: () => this.turnOn(),
      }[newVal]?.()
    },
  },
  async mounted() {
    setTimeout(async () => {
      this.teapotSynchronizer = new TeapotSynchronizer(this.teapotId)
      this.teapotSynchronizer.subscribe()
      this.teapotSynchronizer.on('update', async serverState => {
        if (serverState.err) {
          this.err = serverState.err
          if (this.isOwner) this.ongoing = 'idle'
          return
        }
        this.err = null
        this.ownerAccountId = serverState.accountId
        this.temperature = serverState.temperature
        this.ongoing = serverState.ongoing
        this.isOnline = serverState.isOnline || false
      })
      await this.teapotSynchronizer?.sendEvent('getById')
    }, 100)
    document.addEventListener('visibilitychange', async () => {
      if (!document.hidden) {
        await this.teapotSynchronizer?.sendEvent('getById')
        window.console.log('teapot data synchronized')
      }
    })
  },
  unmounted() {
    this.teapotSynchronizer?.unsubscribe()
    this.teapotSynchronizer?.removeAllListeners('update')
    this.teapotSynchronizer = null
  },
  methods: {
    async ready() {
      this.ongoing = 'idle'
      await this.teapotSynchronizer?.sendEvent('show')
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
      await this.teapotSynchronizer?.sendEvent('turnOn')
      // this.loading = ''
    },
    async handleTurnOff() {
      this.ongoing = 'idle'
      // this.loading = 'handleTurnOff'
      await this.teapotSynchronizer?.sendEvent('turnOff')
      // this.loading = ''
    },
    async handleDrain() {
      this.ongoing = 'idle'
      this.temperature = 0
      // this.loading = 'handleDrain'
      await this.teapotSynchronizer?.sendEvent('drain')
      // this.loading = ''
    },
    boil() {
      this.temperature = range(this.temperature + 1)
      if (this.temperature === 100 && this.ongoing === 'boiling') this.ready()
    },
    async handleJoin() {
      await this.teapotSynchronizer.sendEvent('join')
    },
    async handleLeave() {
      await this.teapotSynchronizer?.sendEvent('leave')
    },
  },
}
</script>

<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-sheet
        border="primary opacity-75"
        :class="{ 'bg-grey-darken-3': !isOnline, 'border-lg': isOwner }"
      >
        <v-container class="text-center">
          <v-row>
            <v-col>
              <TurboBtn kind="join" @click="handleJoin" />
            </v-col>
            <v-col>
              <TurboBtn kind="leave" @click="handleLeave" />
            </v-col>
          </v-row>
          <h1 class="mb-3" :class="isOnline ? 'text-green' : 'text-red'">
            {{ ownerNickname }} Teapot {{ isOwner }}
          </h1>
          <v-row>
            <v-col cols="12">
              <v-progress-linear
                height="23"
                :model-value="temperature"
                :color="isOnline ? 'indigo' : 'indigo-lighten-1'"
                :striped="isOnline"
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
            <v-col v-if="isBoiled" cols="12">
              <h1>READY!</h1>
            </v-col>
            <v-col v-else cols="12">
              <h1 v-if="err">{{ err._errors[0] }}...</h1>
              <h1 v-else>{{ ongoing }}...</h1>
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
